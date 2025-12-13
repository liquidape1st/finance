package com.example.finance.backup4j;

import com.example.finance.backup4j.exceptions.MysqlBackup4JException;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import java.sql.*;
import java.util.ArrayList;
import java.util.List;
import java.util.Objects;

public class MysqlBaseService {

    private static final Logger logger = LoggerFactory.getLogger(MysqlBaseService.class);

    static final String SQL_START_PATTERN = "-- start";
    static final String SQL_END_PATTERN = "-- end";

    public static Connection connect(String username, String password, String host, String port, String database, String driverName) throws ClassNotFoundException, SQLException {

        String url = String.format("jdbc:mysql://%s:%s/%s", host, port, database);
        url = url + "?useUnicode=true&useJDBCCompliantTimezoneShift=true"
                + "&useLegacyDatetimeCode=false&serverTimezone=UTC&useSSL=false";

        return connectWithURL(username, password, url, driverName);
    }


    static Connection connectWithURL(String username, String password, String jdbcURL, String driverName) throws ClassNotFoundException, SQLException {
        String driver = (Objects.isNull(driverName) || driverName.isEmpty()) ? "com.mysql.cj.jdbc.Driver" : driverName;
        return doConnect(driver, jdbcURL, username, password);
    }

    private static Connection doConnect(String driver, String url, String username, String password) throws SQLException, ClassNotFoundException {
        Class.forName(driver);
        Connection connection = DriverManager.getConnection(url, username, password);
        logger.debug("DB Connected Successfully");
        return connection;
    }

    static TablesResponse getAllTablesAndViews(String database, Statement stmt) throws SQLException {

        List<String> tables = new ArrayList<>();
        List<String> views = new ArrayList<>();

        ResultSet rs;
        rs = stmt.executeQuery("SHOW TABLE STATUS FROM `" + database + "`;");
        while (rs.next()) {
            String comment = rs.getString("Comment");
            if ("VIEW".equals(comment)) {
                views.add(rs.getString("Name"));
            } else {
                tables.add(rs.getString("Name"));
            }
        }

        return new TablesResponse(tables, views);
    }

    public static String extractDatabaseNameFromJDBCUrl(String jdbcURL) {

        if (jdbcURL == null || jdbcURL.isEmpty())
            throw new MysqlBackup4JException("Null or Empty JDBC URL supplied: " + jdbcURL);

        //strip the extra properties from the URL
        String jdbcURLWithoutParams;
        if (jdbcURL.contains("?")) {
            jdbcURLWithoutParams = jdbcURL.substring(0, jdbcURL.indexOf("?"));
        } else {
            jdbcURLWithoutParams = jdbcURL;
        }

        return jdbcURLWithoutParams.substring(jdbcURLWithoutParams.lastIndexOf("/") + 1);
    }

}
