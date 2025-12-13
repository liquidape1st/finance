package com.example.finance.config;

import com.example.finance.model.*;
import com.example.finance.repository.BlogPostCategoryRepository;
import com.example.finance.repository.PermissionRepository;
import com.example.finance.repository.RoleRepository;
import com.example.finance.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.boot.CommandLineRunner;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;
import org.springframework.transaction.annotation.Transactional;

import java.util.HashSet;
import java.util.List;
import java.util.Set;

@Component
@RequiredArgsConstructor
public class DataInitializer implements CommandLineRunner {

    private final RoleRepository roleRepository;
    private final PermissionRepository permissionRepository;
    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final BlogPostCategoryRepository blogPostCategoryRepository;

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

        if (blogPostCategoryRepository.count() == 0) {
            createBlogPostCategories();
        }
        // Create or update default admin user
        createSystemAdminAccount();
    }

    private void createBlogPostCategories () {
        String[] categories = {"Văn hóa", "Sản phẩm", "Làng nghề", "Phong thủy", "Sức khỏe"};
        for (String categoryName : categories) {
            BlogPostCategory blogPostCategory = new BlogPostCategory();
            blogPostCategory.setName(categoryName);
            blogPostCategoryRepository.save(blogPostCategory);
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

                "ORDER_ITEM:READ",
                "ORDER_ITEM:CREATE",
                "ORDER_ITEM:UPDATE",
                "ORDER_ITEM:DELETE",

                "PRODUCT:READ",
                "PRODUCT:CREATE",
                "PRODUCT:UPDATE",
                "PRODUCT:DELETE",

                "ORDER:READ",
                "ORDER:CREATE",
                "ORDER:UPDATE",
                "ORDER:DELETE",

                "BLOG:READ",
                "BLOG:CREATE",
                "BLOG:UPDATE",
                "BLOG:DELETE",
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

        userPerms.add(findPermissionByName(allPermissions, "BLOG:READ"));

        userPerms.add(findPermissionByName(allPermissions, "ORDER:READ"));

        userPerms.add(findPermissionByName(allPermissions, "PRODUCT:READ"));

        userPerms.add(findPermissionByName(allPermissions, "PERMISSION:READ"));

        userPerms.add(findPermissionByName(allPermissions, "USER:READ"));

        userRole.setPermissions(userPerms);
        roleRepository.save(userRole);

        // MANAGER Role
        Role managerRole = new Role();
        managerRole.setName(Role.RoleName.MANAGER);
        managerRole.setDescription("Manager - can manage products and orders");
        Set<Permission> managerPerms = new HashSet<>(userPerms);

        managerPerms.add(findPermissionByName(allPermissions, "ORDER_ITEM:READ"));
        managerPerms.add(findPermissionByName(allPermissions, "ORDER_ITEM:CREATE"));
        managerPerms.add(findPermissionByName(allPermissions, "ORDER_ITEM:UPDATE"));

        managerPerms.add(findPermissionByName(allPermissions, "PRODUCT:READ"));
        managerPerms.add(findPermissionByName(allPermissions, "PRODUCT:CREATE"));
        managerPerms.add(findPermissionByName(allPermissions, "PRODUCT:UPDATE"));

        managerPerms.add(findPermissionByName(allPermissions, "ORDER:READ"));
        managerPerms.add(findPermissionByName(allPermissions, "ORDER:CREATE"));
        managerPerms.add(findPermissionByName(allPermissions, "ORDER:UPDATE"));

        managerPerms.add(findPermissionByName(allPermissions, "BLOG:READ"));
        managerPerms.add(findPermissionByName(allPermissions, "BLOG:CREATE"));
        managerPerms.add(findPermissionByName(allPermissions, "BLOG:UPDATE"));

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
        User admin = userRepository.findByEmail("admin@coinguon.vn").orElse(new User());
        if (admin.getId() == null) {
            // Set or update user properties
            admin.setEmail("admin@coinguon.vn");
            admin.setPassword(passwordEncoder.encode("admin123"));
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

