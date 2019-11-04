# ChatSpace DB 設計

![ER図](https://user-images.githubusercontent.com/39142850/68106148-089e2c00-ff24-11e9-866b-f3af3e0097cd.png)

## users テーブル

| Column    | Type         | Options                   |
| --------- | ------------ | ------------------------- |
| user_name | varchar(255) | null: false               |
| email     | varchar(255) | null: false, unique: true |
| password  | char(32)     | null: false               |

### Association

- has_many : users_groups
- has_many : messages
- has_many : groups through: :users_groups

## groups テーブル

| Column     | Type         | Options     |
| ---------- | ------------ | ----------- |
| group_name | varchar(255) | null: false |

### Association

- has_many : messages
- has_many : users_groups
- has_many : users through: :users_groups

## messages テーブル

| Column   | Type         | Options                        |
| -------- | ------------ | ------------------------------ |
| body     | text         | null: false                    |
| image    | string       | null: false                    |
| user_id  | integer      | null: false, foreign_key: true |
| group_id | varchar(255) | null: false, foreign_key: true |

### Association

- belongs_to : user
- belongs_to : group

## users_groups テーブル

| Column   | Type    | Options     |
| -------- | ------- | ----------- |
| user_id  | integer | null: false |
| group_id | integer | null: false |

### Association

- belongs_to : user
- belongs_to : group
