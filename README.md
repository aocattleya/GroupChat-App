# ChatSpace DB 設計

![ER図](https://user-images.githubusercontent.com/39142850/68107922-9f211c00-ff29-11e9-990a-65915a064fc9.png)

## users テーブル

| Column    | Type         | Options                   |
| --------- | ------------ | ------------------------- |
| name      | string       | null: false               |
| email     | string       | null: false, unique: true |
| password  | string       | null: false               |

### Association

- has_many : users_groups
- has_many : messages
- has_many : groups through: :users_groups

## groups テーブル

| Column     | Type         | Options     |
| ---------- | ------------ | ----------- |
| name       | string       | null: false |

### Association

- has_many : messages
- has_many : users_groups
- has_many : users through: :users_groups

## messages テーブル

| Column   | Type         | Options                        |
| -------- | ------------ | ------------------------------ |
| body     | text         |                                |
| image    | string       |                                |
| user_id  | integer      | null: false, foreign_key: true |
| group_id | integer      | null: false, foreign_key: true |

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
