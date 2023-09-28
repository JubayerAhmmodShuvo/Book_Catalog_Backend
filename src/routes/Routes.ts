import express from 'express';
import { AuthRoute } from '../app/modules/auth/auth.route';
import { UserRoute } from '../app/modules/user/user.routes';
import { ProfileRoute } from '../app/modules/profile/profile.routes';
import { CategoriesRoute } from '../app/modules/category/category.routes';
import { BookRoute } from '../app/modules/books/book.routes';


const router = express.Router();

const all_routes = [
  { path: '/auth', router: AuthRoute },
  { path: '/users', router: UserRoute },
  { path: '/profile', router: ProfileRoute },
  { path: '/categories', router: CategoriesRoute },
  { path: '/books', router: BookRoute },
];

all_routes.map(item => router.use(item.path, item.router));

export default router;
