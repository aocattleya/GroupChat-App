![groupchat](https://user-images.githubusercontent.com/39142850/68285943-949a8a00-00c3-11ea-9115-96962290da5d.png)

# 📝 GroupChat-App

- Ruby　2.5.1
  - Ruby on Rails　5.0.7.2
- HAML
- SCSS
  - BEM
- JavaScript
  - jQuery
- Font Awesome5
- MySQL2
- AWS
  - Amazon S3
  - Nginx
  - Unicorn
  - CarrierWave
  - capistrano

# 📘 Usage

```
$ git clone https://github.com/aocattleya/GroupChat-App.git
$ cd GroupChat-App
$ bundle install
$ rails db:create
$ rails db:migrate
```

# 📦 Features

## ・Asynchronous communication

![Ajax](https://user-images.githubusercontent.com/39142850/68860107-2b9ebc00-072c-11ea-9849-08d1b0ad4637.gif)
　
## ・Automatic updating

![auto](https://user-images.githubusercontent.com/39142850/69133731-b9e2bb80-0af9-11ea-92c7-4cae24d9bb2c.gif)
　
## ・Incremental search

![Incremental search](https://user-images.githubusercontent.com/39142850/69483415-880b8500-0e6a-11ea-8ce5-f7770ec3c560.gif)
　
# 📊 Database design

![ER](https://user-images.githubusercontent.com/39142850/68107922-9f211c00-ff29-11e9-990a-65915a064fc9.png)

## Table : users

| Column    | Type         | Options                   |
| --------- | ------------ | ------------------------- |
| name      | string       | null: false               |
| email     | string       | null: false, unique: true |
| password  | string       | null: false               |

### Association

- has_many : users_groups
- has_many : messages
- has_many : groups through: :users_groups

## Table : groups

| Column     | Type         | Options     |
| ---------- | ------------ | ----------- |
| name       | string       | null: false |

### Association

- has_many : messages
- has_many : users_groups
- has_many : users through: :users_groups

## Table : messages

| Column   | Type         | Options                        |
| -------- | ------------ | ------------------------------ |
| body     | text         |                                |
| image    | string       |                                |
| user_id  | integer      | null: false, foreign_key: true |
| group_id | integer      | null: false, foreign_key: true |

### Association

- belongs_to : user
- belongs_to : group

## Table : users_groups

| Column   | Type    | Options     |
| -------- | ------- | ----------- |
| user_id  | integer | null: false |
| group_id | integer | null: false |

### Association

- belongs_to : user
- belongs_to : group
