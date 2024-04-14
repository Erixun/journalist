# Journalist - using React + TypeScript + Vite


## Expanding the ESLint configuration

If you are developing a production application, we recommend updating the configuration to enable type aware lint rules:

- Configure the top-level `parserOptions` property like this:

```js
export default {
  // other rules...
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
    project: ['./tsconfig.json', './tsconfig.node.json'],
    tsconfigRootDir: __dirname,
  },
}
```

- Replace `plugin:@typescript-eslint/recommended` to `plugin:@typescript-eslint/recommended-type-checked` or `plugin:@typescript-eslint/strict-type-checked`
- Optionally add `plugin:@typescript-eslint/stylistic-type-checked`
- Install [eslint-plugin-react](https://github.com/jsx-eslint/eslint-plugin-react) and add `plugin:react/recommended` & `plugin:react/jsx-runtime` to the `extends` list

## How to set up a containerized MYSQL Database

1. Pull the MYSQL image from Docker Hub

```bash
docker pull mysql:5.7
```

2. Create a new container from the MYSQL image

```bash
docker run --name mysql -e MYSQL_ROOT_PASSWORD=secret -d -p 3306:3306 mysql:5.7
```

3. Access the MYSQL container

```bash
docker exec -it mysql bash
```

4. Access the MYSQL database

```bash
mysql -u root -p
```

5. Create database and table

```sql
CREATE DATABASE journalistdb;
USE journalistdb;
CREATE TABLE entries (
  id VARCHAR(255) PRIMARY KEY,
  title VARCHAR(255) NOT NULL,
  body TEXT NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
);
```
Now you may work with the `journalistdb` database and the `entries` table in your electron app.