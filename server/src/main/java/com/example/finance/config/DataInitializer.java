package com.example.finance.config;

import com.example.finance.model.*;
import com.example.finance.repository.CategoryRepository;
import com.example.finance.repository.PermissionRepository;
import com.example.finance.repository.RoleRepository;
import com.example.finance.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.boot.CommandLineRunner;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;
import org.springframework.transaction.annotation.Transactional;

import java.util.*;

@Component
@RequiredArgsConstructor
public class DataInitializer implements CommandLineRunner {

    private final RoleRepository roleRepository;
    private final PermissionRepository permissionRepository;
    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final CategoryRepository categoryRepository;

    @Override
    @Transactional
    public void run(String... args) {
        // Initialize Permissions
        if (permissionRepository.count() == 0) {
            createPermissions();
        }

        // Initialize Roles
        if (roleRepository.count() == 0) {
            createRoles();
        }

        if (categoryRepository.count() == 0) {
            createBlogPostCategories();
        }
        // Create or update default admin user
        createSystemAdminAccount();
    }

    private void createBlogPostCategories () {
        Map<String, String[]> categories = new HashMap<>();
        categories.put("vi", new String[]{"Tiền điện tử", "Forex"});
        categories.put("en", new String[]{"Cryptocurrency", "Forex"});

        int n = categories.get("vi").length;

        for (int i = 0; i < n; i++) {
            Category category = new Category();
            for (String lang : categories.keySet()) {
                CategoryTranslation translation = new CategoryTranslation();
                translation.setLangCode(lang);
                translation.setName(categories.get(lang)[i]);
                translation.setCategory(category);
                category.getTranslations().add(translation);
            }
            categoryRepository.save(category);
        }
    }

    private void createPermissions() {
        String[] permissions = {
                "USER:READ",
                "USER:CREATE",
                "USER:UPDATE",
                "USER:DELETE",

                "PERMISSION:READ",
                "PERMISSION:CREATE",
                "PERMISSION:UPDATE",
                "PERMISSION:DELETE",

                "TAG:READ",
                "TAG:CREATE",
                "TAG:UPDATE",
                "TAG:DELETE",

                "BLOG:READ",
                "BLOG:CREATE",
                "BLOG:UPDATE",
                "BLOG:DELETE",

                "CATEGORY:READ",
                "CATEGORY:CREATE",
                "CATEGORY:UPDATE",
                "CATEGORY:DELETE",

                "TAG-TRANSLATION:READ",
                "TAG-TRANSLATION:CREATE",
                "TAG-TRANSLATION:UPDATE",
                "TAG-TRANSLATION:DELETE",

                "BLOG-TRANSLATION:READ",
                "BLOG-TRANSLATION:CREATE",
                "BLOG-TRANSLATION:UPDATE",
                "BLOG-TRANSLATION:DELETE",

                "CATEGORY-TRANSLATION:READ",
                "CATEGORY-TRANSLATION:CREATE",
                "CATEGORY-TRANSLATION:UPDATE",
                "CATEGORY-TRANSLATION:DELETE",
        };

        for (String permName : permissions) {
            Permission permission = new Permission();
            permission.setName(permName);
            permission.setCode(permName);
            permissionRepository.save(permission);
        }
    }

    private void createRoles() {
        // Fetch all permissions first to avoid lazy loading issues
        List<Permission> allPermissions = permissionRepository.findAll();

        // USER Role
        Role userRole = new Role();
        userRole.setName(Role.RoleName.USER);
        userRole.setDescription("Regular user - can view products and create orders");
        Set<Permission> userPerms = new HashSet<>();

        userPerms.add(findPermissionByName(allPermissions, "TAG:READ"));

        userPerms.add(findPermissionByName(allPermissions, "TAG-TRANSLATION:READ"));

        userPerms.add(findPermissionByName(allPermissions, "BLOG:READ"));

        userPerms.add(findPermissionByName(allPermissions, "BLOG-TRANSLATION:READ"));

        userPerms.add(findPermissionByName(allPermissions, "CATEGORY:READ"));

        userPerms.add(findPermissionByName(allPermissions, "CATEGORY-TRANSLATION:READ"));

        userRole.setPermissions(userPerms);
        roleRepository.save(userRole);

        // MANAGER Role
        Role managerRole = new Role();
        managerRole.setName(Role.RoleName.MANAGER);
        managerRole.setDescription("Manager - can manage products and orders");
        Set<Permission> managerPerms = new HashSet<>(userPerms);

        managerPerms.add(findPermissionByName(allPermissions, "TAG:READ"));
        managerPerms.add(findPermissionByName(allPermissions, "TAG:CREATE"));
        managerPerms.add(findPermissionByName(allPermissions, "TAG:UPDATE"));

        managerPerms.add(findPermissionByName(allPermissions, "BLOG:READ"));
        managerPerms.add(findPermissionByName(allPermissions, "BLOG:CREATE"));
        managerPerms.add(findPermissionByName(allPermissions, "BLOG:UPDATE"));

        managerPerms.add(findPermissionByName(allPermissions, "CATEGORY:READ"));
        managerPerms.add(findPermissionByName(allPermissions, "CATEGORY:CREATE"));
        managerPerms.add(findPermissionByName(allPermissions, "CATEGORY:UPDATE"));

        managerPerms.add(findPermissionByName(allPermissions, "TAG-TRANSLATION:READ"));
        managerPerms.add(findPermissionByName(allPermissions, "TAG-TRANSLATION:CREATE"));
        managerPerms.add(findPermissionByName(allPermissions, "TAG-TRANSLATION:UPDATE"));

        managerPerms.add(findPermissionByName(allPermissions, "BLOG-TRANSLATION:READ"));
        managerPerms.add(findPermissionByName(allPermissions, "BLOG-TRANSLATION:CREATE"));
        managerPerms.add(findPermissionByName(allPermissions, "BLOG-TRANSLATION:UPDATE"));

        managerPerms.add(findPermissionByName(allPermissions, "CATEGORY-TRANSLATION:READ"));
        managerPerms.add(findPermissionByName(allPermissions, "CATEGORY-TRANSLATION:CREATE"));
        managerPerms.add(findPermissionByName(allPermissions, "CATEGORY-TRANSLATION:UPDATE"));

        managerRole.setPermissions(managerPerms);
        roleRepository.save(managerRole);

        // ADMIN Role
        Role adminRole = new Role();
        adminRole.setName(Role.RoleName.ADMIN);
        adminRole.setDescription("Administrator - full access");
        adminRole.setPermissions(new HashSet<>(allPermissions));
        roleRepository.save(adminRole);
    }

    private Permission findPermissionByName(List<Permission> permissions, String name) {
        return permissions.stream()
                .filter(p -> p.getName().equals(name))
                .findFirst()
                .orElseThrow(() -> new RuntimeException("Permission not found: " + name));
    }

    private void createSystemAdminAccount() {
        User admin = userRepository.findByEmail("liquidape@finance.com").orElse(new User());
        if (admin.getId() == null) {
            // Set or update user properties
            admin.setEmail("liquidape@finance.com");
            admin.setPassword(passwordEncoder.encode("liquidape123@#"));
            admin.setFullName("Administrator");
            admin.setPhone("0123456789");
            admin.setAddress("Vietnam");

            // Ensure admin has ADMIN role
            Role adminRole = roleRepository.findByName(Role.RoleName.ADMIN).orElseThrow(() -> new RuntimeException("Admin role not found"));
            Set<Role> roles = admin.getRoles() != null ? admin.getRoles() : new HashSet<>();
            roles.add(adminRole);
            admin.setRoles(roles);

            userRepository.save(admin);
        }
    }
}

