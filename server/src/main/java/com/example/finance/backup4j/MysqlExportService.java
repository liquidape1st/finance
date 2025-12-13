package com.example.finance.backup4j;

import com.example.finance.backup4j.exceptions.MysqlBackup4JException;
import lombok.Getter;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.zeroturnaround.zip.ZipUtil;

import java.io.File;
import java.io.FileOutputStream;
import java.io.IOException;
import java.sql.*;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.List;
import java.util.Objects;
import java.util.Properties;

import static com.example.finance.backup4j.helpers.MysqlExportServiceHelper.bytesToHex;


public class MysqlExportService {

    private Statement stmt;
    private String database;

    @Getter
    private String generatedSql = "";
    private final Logger logger = LoggerFactory.getLogger(getClass());
    private final String LOG_PREFIX = "mysql-backup4j-export";
    private String dirName = "mysql-backup4j-export-temp";
    @Getter
    private String sqlFileName = "";
    private String zipFileName = "";
    private final Properties properties;

    public static final String DB_NAME = "DB_NAME";
    public static final String DB_USERNAME = "DB_USERNAME";
    public static final String DB_PASSWORD = "DB_PASSWORD";
    public static final String DB_HOST = "DB_HOST";
    public static final String DB_PORT = "DB_PORT";
    public static final String PRESERVE_GENERATED_ZIP = "PRESERVE_GENERATED_ZIP";
    public static final String PRESERVE_GENERATED_SQL_FILE = "PRESERVE_GENERATED_SQL_FILE";
    public static final String TEMP_DIR = "TEMP_DIR";
    public static final String ADD_IF_NOT_EXISTS = "ADD_IF_NOT_EXISTS";


    public static final String JDBC_CONNECTION_STRING = "JDBC_CONNECTION_STRING";
    public static final String JDBC_DRIVER_NAME = "JDBC_DRIVER_NAME";
    public static final String SQL_FILE_NAME = "SQL_FILE_NAME";


    public MysqlExportService(Properties properties) {
        this.properties = properties;
    }

    /**
     * This function will check if the required minimum
     * properties are set for database connection and exporting
     * password is excluded here because it's possible to have a mysql database
     * user with no password
     *
     * @return true if all required properties are present and false if otherwise
     */
    private boolean isValidateProperties() {
        return properties != null &&
                properties.containsKey(DB_USERNAME) &&
                (properties.containsKey(DB_NAME) || properties.containsKey(JDBC_CONNECTION_STRING));
    }

    /**
     * This function will return true
     * or false based on the availability
     * or absence of a custom output sql
     * file name
     *
     * @return bool
     */
    private boolean isSqlFileNamePropertySet() {
        return properties != null &&
                properties.containsKey(SQL_FILE_NAME);
    }

    private String getTableInsertStatement(String table) throws SQLException {

        StringBuilder sql = new StringBuilder();
        ResultSet rs;
        boolean addIfNotExists = Boolean.parseBoolean(properties.containsKey(ADD_IF_NOT_EXISTS) ? properties.getProperty(ADD_IF_NOT_EXISTS, "true") : "true");


        if (table != null && !table.isEmpty()) {
            rs = stmt.executeQuery("SHOW CREATE TABLE " + "`" + table + "`;");
            while (rs.next()) {
                String qtbl = rs.getString(1);
                String query = rs.getString(2);
                sql.append("\n\n--");
                sql.append("\n").append(MysqlBaseService.SQL_START_PATTERN).append("  table dump : ").append(qtbl);
                sql.append("\n--\n\n");

                if (addIfNotExists) {
                    query = query.trim().replace("CREATE TABLE", "CREATE TABLE IF NOT EXISTS");
                }

                sql.append(query).append(";\n\n");
            }

            sql.append("\n\n--");
            sql.append("\n").append(MysqlBaseService.SQL_END_PATTERN).append("  table dump : ").append(table);
            sql.append("\n--\n\n");
        }

        return sql.toString();
    }

    private String getCreateViewStatement(String view) throws SQLException {

        StringBuilder sql = new StringBuilder();
        ResultSet rs;

        if (view != null && !view.isEmpty()) {
            rs = stmt.executeQuery("SHOW CREATE VIEW " + "`" + view + "`;");
            while (rs.next()) {
                String viewName = rs.getString(1);
                String viewQuery = rs.getString(2);
                sql.append("\n\n--");
                sql.append("\n").append(MysqlBaseService.SQL_START_PATTERN).append("  view dump : ").append(view);
                sql.append("\n--\n\n");

                String finalQuery = "CREATE OR REPLACE VIEW `" + viewName + "` " + (viewQuery.substring(viewQuery.indexOf("AS")).trim());
                sql.append(finalQuery).append(";\n\n");
            }

            sql.append("\n\n--");
            sql.append("\n").append(MysqlBaseService.SQL_END_PATTERN).append("  view dump : ").append(view);
            sql.append("\n--\n\n");
        }

        return sql.toString();
    }

    private String getDataInsertStatement(String table) throws SQLException {

        StringBuilder sql = new StringBuilder();

        ResultSet rs = stmt.executeQuery("SELECT * FROM " + "`" + table + "`;");

        //move to the last row to get max rows returned
        rs.last();
        int rowCount = rs.getRow();

        //there are no records just return empty string
        if (rowCount <= 0) {
            return sql.toString();
        }

        sql.append("\n--").append("\n-- Inserts of ").append(table).append("\n--\n\n");

        //temporarily disable foreign key constraint
        sql.append("\n/*!40000 ALTER TABLE `").append(table).append("` DISABLE KEYS */;\n");

        sql.append("\n--\n")
                .append(MysqlBaseService.SQL_START_PATTERN).append(" table insert : ").append(table)
                .append("\n--\n");

        sql.append("INSERT INTO `").append(table).append("`(");

        ResultSetMetaData metaData = rs.getMetaData();
        int columnCount = metaData.getColumnCount();

        //generate the column names that are present
        //in the returned result set
        //at this point the insert is INSERT INTO (`col1`, `col2`, ...)
        for (int i = 0; i < columnCount; i++) {
            sql.append("`")
                    .append(metaData.getColumnName(i + 1))
                    .append("`, ");
        }

        //remove the last whitespace and comma
        sql.deleteCharAt(sql.length() - 1).deleteCharAt(sql.length() - 1).append(") VALUES \n");

        //now we're going to build the values for data insertion
        rs.beforeFirst();
        while (rs.next()) {
            sql.append("(");
            for (int i = 0; i < columnCount; i++) {

                int columnType = metaData.getColumnType(i + 1);
                int columnIndex = i + 1;

                //this is the part where the values are processed based on their type
                if (Objects.isNull(rs.getObject(columnIndex))) {
                    sql.append(rs.getObject(columnIndex)).append(", ");
                } else if (columnType == Types.BIGINT) {
                    sql.append(rs.getLong(columnIndex)).append(", ");
                } else if (columnType == Types.INTEGER || columnType == Types.TINYINT || columnType == Types.BIT || columnType == Types.SMALLINT) {
                    sql.append(rs.getInt(columnIndex)).append(", ");
                } else if (columnType == Types.REAL || columnType == Types.FLOAT || columnType == Types.DOUBLE || columnType == Types.DECIMAL
                        || columnType == Types.NUMERIC) {
                    sql.append(rs.getDouble(columnIndex)).append(", ");
                } else if (columnType == Types.BINARY || columnType == Types.BLOB || columnType == Types.LONGVARBINARY || columnType == Types.VARBINARY) {
                    sql.append("0x").append(bytesToHex(rs.getBytes(columnIndex))).append(", ");
                } else {

                    String val = rs.getString(columnIndex);
                    //escape the single quotes that might be in the value
                    val = val.replace("'", "\\'");

                    sql.append("'").append(val).append("', ");
                }
            }

            //now that we're done with a row
            //let's remove the last whitespace and comma
            sql.deleteCharAt(sql.length() - 1).deleteCharAt(sql.length() - 1);

            //if this is the last row, just append a closing
            //parenthesis otherwise append a closing parenthesis and a comma
            //for the next set of values
            if (rs.isLast()) {
                sql.append(")");
            } else {
                sql.append("),\n");
            }
        }

        //now that we are done processing the entire row
        //let's add the terminator
        sql.append(";");

        sql.append("\n--\n")
                .append(MysqlBaseService.SQL_END_PATTERN).append(" table insert : ").append(table)
                .append("\n--\n");

        //enable FK constraint
        sql.append("\n/*!40000 ALTER TABLE `").append(table).append("` ENABLE KEYS */;\n");

        return sql.toString();
    }

    private String exportToSql() throws SQLException {

        StringBuilder sql = new StringBuilder();
        sql.append("--");
        sql.append("\n-- Generated by mysql-backup4j");
        sql.append("\n-- https://github.com/SeunMatt/mysql-backup4j");
        sql.append("\n-- Date: ").append(new SimpleDateFormat("d-M-y H:m:s").format(new Date()));
        sql.append("\n--");

        //these declarations are extracted from HeidiSQL
        sql.append("\n\n/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;")
                .append("\n/*!40101 SET NAMES utf8 */;")
                .append("\n/*!50503 SET NAMES utf8mb4 */;")
                .append("\n/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;")
                .append("\n/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;");


        //get the tables that are in the database
//        List<String> tables = MysqlBaseService.getAllTables(database, stmt);
        TablesResponse allTablesAndViews = MysqlBaseService.getAllTablesAndViews(database, stmt);

        List<String> tables = allTablesAndViews.getTables();
        //for every table, get the table creation and data
        // insert statement
        for (String s : tables) {
            try {
                sql.append(getTableInsertStatement(s.trim()));
                sql.append(getDataInsertStatement(s.trim()));
            } catch (SQLException e) {
                logger.error("Exception occurred while processing table: {}", s, e);
            }
        }


        //process views if there's any
        List<String> views = allTablesAndViews.getViews();
        for (String v : views) {
            try {
                sql.append(getCreateViewStatement(v.trim()));
            } catch (SQLException e) {
                logger.error("Exception occurred while processing view: {}", v, e);
            }
        }

        sql.append("\n/*!40101 SET SQL_MODE=IFNULL(@OLD_SQL_MODE, '') */;")
                .append("\n/*!40014 SET FOREIGN_KEY_CHECKS=IF(@OLD_FOREIGN_KEY_CHECKS IS NULL, 1, @OLD_FOREIGN_KEY_CHECKS) */;")
                .append("\n/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;");

        this.generatedSql = sql.toString();
        return sql.toString();
    }

    public File export() throws IOException, SQLException, ClassNotFoundException {

        //check if properties is set or not
        if (!isValidateProperties()) {
            String message = "Invalid config properties: The config properties is missing important parameters: DB_NAME, DB_USERNAME and DB_PASSWORD";
            logger.error(message);
            throw new MysqlBackup4JException(message);
        }

        //connect to the database
        database = properties.getProperty(DB_NAME);
        String jdbcURL = properties.getProperty(JDBC_CONNECTION_STRING, "");
        String driverName = properties.getProperty(JDBC_DRIVER_NAME, "");

        Connection connection;

        if (jdbcURL == null || jdbcURL.isEmpty()) {
            connection = MysqlBaseService.connect(
                    properties.getProperty(DB_USERNAME),
                    properties.getProperty(DB_PASSWORD),
                    properties.getProperty(DB_HOST, "localhost"),
                    properties.getProperty(DB_PORT, "3306"),
                    database,
                    driverName);
        } else {
            //this prioritizes the value set using the setDatabase() over the one extracted from the connection string
            //it will only use the one from the connection string if no value is set using the setDatabase()
            if (database == null || database.isEmpty()) {
                database = MysqlBaseService.extractDatabaseNameFromJDBCUrl(jdbcURL);
            }
            connection = MysqlBaseService.connectWithURL(properties.getProperty(DB_USERNAME), properties.getProperty(DB_PASSWORD),
                    jdbcURL, driverName);
        }

        stmt = connection.createStatement(ResultSet.TYPE_SCROLL_INSENSITIVE, ResultSet.CONCUR_READ_ONLY);

        //generate the final SQL
        String sql = exportToSql();

        //close the statement
        stmt.close();

        //close the connection
        connection.close();

        //create a temp dir to store the exported file for processing
        dirName = properties.getProperty(MysqlExportService.TEMP_DIR, dirName);
        File sqlFolder = getFile();

        sqlFileName = getSqlFilename();
        FileOutputStream outputStream = new FileOutputStream(sqlFolder + "/" + sqlFileName);
        outputStream.write(sql.getBytes());
        outputStream.close();

        //zip the file
        zipFileName = dirName + "/" + sqlFileName.replace(".sql", ".zip");
        File generatedZipFile = new File(zipFileName);
        ZipUtil.pack(sqlFolder, generatedZipFile);
        System.out.println(generatedZipFile);
        return generatedZipFile;
    }

    private File getFile() throws IOException {
        File file = new File(dirName);
        if (!file.exists()) {
            boolean res = file.mkdir();
            if (!res) {
                throw new IOException(LOG_PREFIX + ": Unable to create temp dir: " + file.getAbsolutePath());
            }
        }

        //write the sql file out
        File sqlFolder = new File(dirName + "/sql");
        if (!sqlFolder.exists()) {
            boolean res = sqlFolder.mkdir();
            if (!res) {
                throw new IOException(LOG_PREFIX + ": Unable to create temp dir: " + file.getAbsolutePath());
            }
        }
        return sqlFolder;
    }

    private void deleteWithLog(File file, Logger logger) {
        if (file.exists()) {
            boolean res = file.delete();
            logger.debug("{}: {} deleted? {}", LOG_PREFIX, file.getAbsolutePath(), res);
        } else {
            logger.debug("{}: {} DOES NOT EXIST", LOG_PREFIX, file.getAbsolutePath());
        }
    }

    public void clearTempFiles() {
        boolean preserveSql = Boolean.parseBoolean(
                properties.getProperty(PRESERVE_GENERATED_SQL_FILE, "false")
        );
        boolean preserveZip = Boolean.parseBoolean(
                properties.getProperty(PRESERVE_GENERATED_ZIP, "false")
        );

        if (!preserveSql) {
            deleteWithLog(new File(dirName + "/sql/" + sqlFileName), logger);
            deleteWithLog(new File(dirName + "/sql"), logger);
        }

        if (!preserveZip) {
            deleteWithLog(new File(zipFileName), logger);
            deleteWithLog(new File(dirName), logger);
        }

        logger.debug(LOG_PREFIX + ": generated temp files cleared successfully");
    }


    public String getSqlFilename() {
        return isSqlFileNamePropertySet() ? properties.getProperty(SQL_FILE_NAME) + ".sql" :
                new SimpleDateFormat("d_M_y_H_mm_ss").format(new Date()) + "_" + database + "_database_dump.sql";
    }

}
