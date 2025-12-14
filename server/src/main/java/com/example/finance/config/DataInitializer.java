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
        String[] categories = {"Văn hóa", "Sản phẩm", "Làng nghề", "Phong thủy", "Sức khỏe"};
//        for (String categoryName : categories) {
//            Category category = new Category();
//            blogPostCategoryRepository.save(category);
//        }
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

                "BLOG-POST:READ",
                "BLOG-POST:CREATE",
                "BLOG-POST:UPDATE",
                "BLOG-POST:DELETE",

                "BLOG-CATEGORY:READ",
                "BLOG-CATEGORY:CREATE",
                "BLOG-CATEGORY:UPDATE",
                "BLOG-CATEGORY:DELETE",
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

        userPerms.add(findPermissionByName(allPermissions, "BLOG-POST:READ"));

        userPerms.add(findPermissionByName(allPermissions, "BLOG-CATEGORY:READ"));

        userRole.setPermissions(userPerms);
        roleRepository.save(userRole);

        // MANAGER Role
        Role managerRole = new Role();
        managerRole.setName(Role.RoleName.MANAGER);
        managerRole.setDescription("Manager - can manage products and orders");
        Set<Permission> managerPerms = new HashSet<>(userPerms);

        managerPerms.add(findPermissionByName(allPermissions, "BLOG-POST:READ"));
        managerPerms.add(findPermissionByName(allPermissions, "BLOG-POST:CREATE"));
        managerPerms.add(findPermissionByName(allPermissions, "BLOG-POST:UPDATE"));

        managerPerms.add(findPermissionByName(allPermissions, "BLOG-CATEGORY:READ"));
        managerPerms.add(findPermissionByName(allPermissions, "BLOG-CATEGORY:CREATE"));
        managerPerms.add(findPermissionByName(allPermissions, "BLOG-CATEGORY:UPDATE"));

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

