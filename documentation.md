# 🗂️ Tasks

## T-1: Project Setup

-   [✔️] T-1.1 — Folder Structure
-   [✔️] T-1.2 — Routing

## T-2: Authentication

-   [✔️] T-2.1 — Login
-   [✔️] T-2.2 — Forgot Password
-   [✔️] T-2.3 — Reset Password
-   [✔️] T-2.4 — Protected Routes
-   [✔️] T-2.5 — Logout
-   [✔️] T-2.6 — Change Password
-   [✔️] T-2.7 — Register
-   [✔️] T-2.8 — Login Data context
-   [✔️] T-2.9 — deal with fetching current user data
-   [✔️] T-2.10 — Sidebar Authoriation between system user and super admin
-   [✔️] T-2.11 — add role-based access control (RBAC) based on the currentUser's group id

## T-3: Dashboard

-   [✔️] T-3.1 — Header Component
-   [✔️] T-3.2 — Sidebar
-   [✔️] T-3.3 — Navbar
-   [✔️] T-3.4 — change user Photo based on imagePath from login Data

## T-4: Categories Module

-   [✔️] T-4.1 — List Categories
-   [✔️] T-4.2 — Add Category
-   [✔️] T-4.3 — Edit Category
-   [✔️] T-4.4 — Delete Category
-   [✔️] T-4.5 — Search Feature
-   [✔️] T-4.6 — Pagination Feature
-   [✔️] T-4.6 — View Category

## T-5: Recipes Module

-   [✔️] T-5.1 — List Recipes
-   [✔️] T-5.2 — Add Recipe
-   [✔️] T-5.3 — Edit Recipe
-   [✔️] T-5.4 — Delete Recipe
-   [✔️] T-5.5 — Filter Recipes based on tags
-   [✔️] T-5.6 — Filter Recipes based on categories
-   [✔️] T-5.7 — Recipe Actions Authorization between systemuser and superadmin.

## T-6: Users Module

-   [✔️] T-6.1 — List Users
-   [✔️] T-6.2 — Delete User
-   [✔️] T-6.3 — Filter Users with userName
-   [✔️] T-6.4 — Filter Users with user group
-   [✔️] T-6.5 — Handle User View Modal
-   [✔️] T-6.6 — Customize actions menu for every user in usersList

## T-7: Favourites Module

-   [✔️] T-7.1 — List Favourites
-   [✔️] T-7.2 — Add Favourite
-   [✔️] T-7.3 — Delete Favourite
-   [✔️] T-7.4 — Favourite Item component
-   [✔️] T-7.5 — Show in Favourite page

# 🐛 Issues

-   [✅] I-5.1.1 — Not all recipes are fetched (possibly due to pagination bug)

-   [✅] I-4.6.1 — can't read id from undefined object
-   [✅] I-4.2.1 — when click on add new category twice, second time will has the last value of add category.
-   [✅] I-4.2.2 — can't find url after updating urls based on axios instance
-   [✅] I-3.3.1 — no user profile image if user didn't upload one
-   [✅] I-2.10.1 — unAuthorized when calling currentUser from api: solution => use `interceptors` line 12 in urls.js, to make axiosInstance dynamic with token changes from localStorage.
-   [✅] I-2.10.2 — user can delete and edit recipes.
-   [✅] I-2.4.1 — not-found page appear before getting currentUser data
-   [✅] I-7.5.1 — seketon loader appear with items when remove item.
-   [✅] I-2.3.1 — new password and confirm password validation in register, reset and change password.
