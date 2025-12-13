package com.example.finance.schedules;

import com.example.finance.backup4j.MysqlExportService;
import com.example.finance.service.TelegramService;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Component;

import java.io.File;
import java.io.IOException;
import java.sql.SQLException;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.Properties;

@Component
public class BackupScheduled {
    @Value("${spring.datasource.host}")
    private String host;

    @Value("${spring.datasource.port}")
    private String port;

    @Value("${spring.datasource.username}")
    private String username;

    @Value("${spring.datasource.password}")
    private String password;

    @Value("${spring.datasource.database}")
    private String database;

    private final TelegramService telegramService;

    public BackupScheduled(TelegramService telegramService) {
        this.telegramService = telegramService;
    }

    @Scheduled(fixedRate = 43200000)
    public void doStuff() throws SQLException, IOException, ClassNotFoundException {
        System.out.println("Đang xử lý backup dữ liệu");

        Properties properties = getProperties();
        System.out.println(properties.getProperty(MysqlExportService.TEMP_DIR));
        MysqlExportService mysqlExportService = new MysqlExportService(properties);
        File file = mysqlExportService.export();
        String now = LocalDateTime.now().format(
                DateTimeFormatter.ofPattern("dd/MM/yyyy HH:mm:ss")
        );
        telegramService.sendBackupFile(
                file,
                "Hệ thống backup dữ liệu lúc " + now
        );
        mysqlExportService.clearTempFiles();
    }

    private Properties getProperties() {
        Properties properties = new Properties();
        properties.setProperty(MysqlExportService.DB_NAME, database);
        properties.setProperty(MysqlExportService.DB_USERNAME, username);
        properties.setProperty(MysqlExportService.DB_PASSWORD, password);
        properties.setProperty(MysqlExportService.DB_HOST, host);
        properties.setProperty(MysqlExportService.DB_PORT, port);
        properties.setProperty(MysqlExportService.TEMP_DIR, new File("external").getPath());
        return properties;
    }
}
