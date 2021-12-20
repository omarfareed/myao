DROP DATABASE myao;

create database MYAO;

use MYAO;

drop table if exists `admin`;

/*!40101 set @saved_cs_client     = @@character_set_client */
;

/*!50503 set character_set_client = utf8mb4 */
;

create table `admin` (
  `admin_id` varchar (12) not null,
  `type` smallint not null,
  primary key (`admin_id`)
);

drop table if exists `surfer`;

/*!40101 set @saved_cs_client     = @@character_set_client */
;

/*!50503 set character_set_client = utf8mb4 */
;

create table `surfer` (
  `id` varchar (12) not null,
  `fname` varchar (20) not null,
  `lname` varchar (20) not null,
  `email` varchar (50) not null,
  `password` varchar (20) not null,
  `photo` longtext,
  `gender` tinyint (1) not null,
  `birth_date` date not null,
  `closed_admin` varchar (12) default null,
  `last_login` timestamp not null,
  `is_active` tinyint (1) not null DEFAULT 1,
  `created_date` date not null,
  unique(`email`),
  primary key (`id`),
  key `fk_surfer_admin` (`closed_admin`),
  constraint `fk_surfer_admin` foreign key (`closed_admin`) references `admin` (`admin_id`)
);

drop table if exists `marketer`;

/*!40101 set @saved_cs_client     = @@character_set_client */
;

/*!50503 set character_set_client = utf8mb4 */
;

create table `marketer` (
  `id` varchar (12) not null,
  `fname` varchar (20) not null,
  `lname` varchar (20) not null,
  `email` varchar (50) not null,
  `password` varchar (20) not null,
  `photo` longtext,
  `closed_admin` varchar (12) default null,
  `is_active` tinyint (1) not null,
  `last_published` timestamp,
  `founded_at` date not null,
  primary key (`id`),
  key `fk_marketer_admin` (`closed_admin`),
  constraint `fk_marketer_admin` foreign key (`closed_admin`) references `admin` (`admin_id`)
);

drop table if exists `post`;

/*!40101 set @saved_cs_client     = @@character_set_client */
;

/*!50503 set character_set_client = utf8mb4 */
;

create table `post` (
  `id` varchar (12) not null,
  `post_text` longtext not null,
  `surfer_id` varchar (12) not null,
  `has_multimedia` tinyint (1) not null default 0,
  `created_date` timestamp not null,
  `comment_counter` int not null DEFAULT 0,
  primary key (`id`),
  key `fk_post_surfer` (`surfer_id`),
  constraint `fk_post_surfer` foreign key (`surfer_id`) references `surfer` (`id`)
);

drop table if exists `comment`;

/*!40101 set @saved_cs_client     = @@character_set_client */
;

/*!50503 set character_set_client = utf8mb4 */
;

create table `comment` (
  `post_id` varchar (12) not null,
  `surfer_id` varchar (12) not null,
  `content` longtext not null,
  `created_time` timestamp not null,
  `id` varchar (12) not null,
  primary key (`id`),
  key `fk_comment_post` (`post_id`),
  key `fk_comment_surfer` (`surfer_id`),
  constraint `fk_comment_post` foreign key (`post_id`) references `post` (`id`) on
delete cascade,
  constraint `fk_comment_surfer` foreign key (`surfer_id`) references `surfer` (`id`) on
delete cascade
);

drop table if exists `favpost`;

/*!40101 set @saved_cs_client     = @@character_set_client */
;

/*!50503 set character_set_client = utf8mb4 */
;

create table `favpost` (
  `post_id` varchar (12) not null,
  `surfer_id` varchar (12) not null,
  primary key (`post_id`, `surfer_id`),
  key `fk_favpost_surfer` (`surfer_id`),
  constraint `fk_favpost_post` foreign key (`post_id`) references `post` (`id`) on
delete cascade,
  constraint `fk_favpost_surfer` foreign key (`surfer_id`) references `surfer` (`id`) on
delete cascade
);

drop table if exists `friend`;

/*!40101 set @saved_cs_client     = @@character_set_client */
;

/*!50503 set character_set_client = utf8mb4 */
;

create table `friend` (
  `source_id` varchar (12) not null,
  `target_id` varchar (12) not null,
  `friendship_time` timestamp DEFAULT NULL,
  `blocked` tinyint (1) not null default 0,
  primary key (`source_id`, `target_id`),
  key `fk_friend_surfer1` (`target_id`),
  constraint `fk_friend_surfer` foreign key (`source_id`) references `surfer` (`id`),
  constraint `fk_friend_surfer1` foreign key (`target_id`) references `surfer` (`id`) on
delete cascade
);

drop table if exists `like`;

/*!40101 set @saved_cs_client     = @@character_set_client */
;

/*!50503 set character_set_client = utf8mb4 */
;

create table `like` (
  `type` smallint not null,
  `post_id` varchar (12) not null,
  `surfer_id` varchar (12) not null,
  `like_time` timestamp not null,
  primary key (`post_id`, `surfer_id`),
  constraint `fk_like_post` foreign key (`post_id`) references `post` (`id`) on
delete cascade,
  constraint `fk_like_surfer` foreign key (`surfer_id`) references `surfer` (`id`) on
delete cascade
);

drop table if exists `share`;

/*!40101 set @saved_cs_client     = @@character_set_client */
;

/*!50503 set character_set_client = utf8mb4 */
;

create table `share` (
  `post_id` varchar (12) not null,
  `surfer_id` varchar (12) not null,
  `share_time` timestamp not null,
  constraint `fk_share_post` foreign key (`post_id`) references `post` (`id`) on
delete cascade,
  constraint `fk_share_surfer` foreign key (`post_id`) references `surfer` (`id`) on
delete cascade
);

drop table if exists `location`;

/*!40101 set @saved_cs_client     = @@character_set_client */
;

/*!50503 set character_set_client = utf8mb4 */
;

create table `location` (
  `id` varchar (12) not null,
  `surfer_id` varchar (12) not null,
  `description` longtext not null,
  `maplink` longtext not null,
  `created_date` timestamp not null,
  primary key (`id`),
  key `fk_location_surfer` (`surfer_id`),
  constraint `fk_location_surfer` foreign key (`surfer_id`) references `surfer` (`id`) on
delete cascade
);

drop table if exists `mar_reports_mar`;

/*!40101 set @saved_cs_client     = @@character_set_client */
;

/*!50503 set character_set_client = utf8mb4 */
;

create table `mar_reports_mar` (
  `reported_id` varchar (12) not null,
  `reporter_id` varchar (12) not null default '-1',
  `report_option` smallint not null,
  primary key (`reported_id`, `reporter_id`),
  key `reporter_fk` (`reporter_id`),
  constraint `reported_fk` foreign key (`reported_id`) references `marketer` (`id`) on
delete cascade,
  constraint `reporter_fk` foreign key (`reporter_id`) references `marketer` (`id`)
);

drop table if exists `post_media`;

/*!40101 set @saved_cs_client     = @@character_set_client */
;

/*!50503 set character_set_client = utf8mb4 */
;

create table `post_media` (
  `id` VARCHAR(12) NOT NULL,
  `link` longtext not null,
  `post_id` varchar (12) not null,
  `type` tinyint (1) not null,
  PRIMARY KEY(`id`),
  key `fk_post_media_post` (`post_id`),
  constraint `fk_post_media_post` foreign key (`post_id`) references `post` (`id`) on
delete cascade
);

drop table if exists `product`;

/*!40101 set @saved_cs_client     = @@character_set_client */
;

/*!50503 set character_set_client = utf8mb4 */
;

create table `product` (
  `id` varchar (12) not null,
  `marketer_id` varchar (12) not null,
  `product_text` longtext not null,
  `avg_rating` decimal (2, 1) not null DEFAULT 0,
  `price` decimal (8, 2) not null,
  `created_date` timestamp not null,
  `reviews_counter` int not null DEFAULT 0,
  `product_name` varchar (20) not null,
  primary key (`id`),
  constraint `fk_product_marketer` foreign key (`id`) references `marketer` (`id`) on
delete cascade
);

drop table if exists `product_media`;

/*!40101 set @saved_cs_client     = @@character_set_client */
;

/*!50503 set character_set_client = utf8mb4 */
;

create table `product_media` (
  `id` VARCHAR(12) NOT NULL,
  `link` longtext not null,
  `product_id` varchar (12) not null,
  `type` tinyint (1) not null,
  PRIMARY KEY(`id`),
  key `fk_product_media_product` (`product_id`),
  constraint `fk_product_media_product` foreign key (`product_id`) references `product` (`id`) on
delete cascade
);

drop table if exists `review`;

/*!40101 set @saved_cs_client     = @@character_set_client */
;

/*!50503 set character_set_client = utf8mb4 */
;

create table `review` (
  `surfer_id` varchar (12) not null,
  `product_id` varchar (12) not null,
  `rating` decimal (2, 1) not null,
  `created_time` timestamp not null,
  `content` longtext,
  `id` varchar (12) not null,
  primary key (`id`),
  key `fk_review_product` (`product_id`),
  constraint `fk_review_product` foreign key (`product_id`) references `product` (`id`) on
delete cascade,
  constraint `fk_review_surfser` foreign key (`id`) references `surfer` (`id`) on
delete cascade
);

drop table if exists `sur_rep_mar`;

/*!40101 set @saved_cs_client     = @@character_set_client */
;

/*!50503 set character_set_client = utf8mb4 */
;

create table `sur_rep_mar` (
  `sur_id` varchar (12) not null,
  `mar_id` varchar (12) not null,
  `report_option` smallint not null,
  key `fk_sur_rep_mar_marketer` (`mar_id`),
  key `fk_sur_rep_mar_surfer` (`sur_id`),
  constraint `fk_sur_rep_mar_marketer` foreign key (`mar_id`) references `marketer` (`id`) on
delete cascade,
  constraint `fk_sur_rep_mar_surfer` foreign key (`sur_id`) references `surfer` (`id`)
);

drop table if exists `sur_rep_post`;

/*!40101 set @saved_cs_client     = @@character_set_client */
;

/*!50503 set character_set_client = utf8mb4 */
;

create table `sur_rep_post` (
  `sur_id` varchar (12) not null,
  `post_id` varchar (12) not null,
  `report_option` smallint not null,
  primary key (`sur_id`, `post_id`),
  key `fk_sur_rep_post_post` (`post_id`),
  constraint `fk_sur_rep_post_post` foreign key (`post_id`) references `post` (`id`) on
delete cascade,
  constraint `fk_sur_rep_post_surfer` foreign key (`sur_id`) references `surfer` (`id`)
);

drop table if exists `sur_rep_pro`;

/*!40101 set @saved_cs_client     = @@character_set_client */
;

/*!50503 set character_set_client = utf8mb4 */
;

create table `sur_rep_pro` (
  `sur_id` varchar (12) not null,
  `pro_id` varchar (12) not null,
  `report_option` smallint not null,
  primary key (`sur_id`, `pro_id`),
  key `fk_sur_rep_pro_product` (`pro_id`),
  constraint `fk_sur_rep_pro_product` foreign key (`pro_id`) references `product` (`id`) on
delete cascade,
  constraint `fk_sur_rep_pro_surfer` foreign key (`sur_id`) references `surfer` (`id`)
);

drop table if exists `sur_rep_sur`;

/*!40101 set @saved_cs_client     = @@character_set_client */
;

/*!50503 set character_set_client = utf8mb4 */
;

create table `sur_rep_sur` (
  `reporter_id` varchar (12) not null,
  `reported_id` varchar (12) not null,
  `report_option` smallint not null,
  primary key (`reporter_id`, `reported_id`),
  key `fk_sur_rep_sur_surfer1` (`reported_id`),
  constraint `fk_sur_rep_sur_surfer` foreign key (`reporter_id`) references `surfer` (`id`),
  constraint `fk_sur_rep_sur_surfer1` foreign key (`reported_id`) references `surfer` (`id`) on
delete cascade
);

ALTER TABLE
  myao.admin
ADD
  COLUMN fname VARCHAR(20) NOT NULL
AFTER
  type,
ADD
  COLUMN lname VARCHAR(20) NOT NULL
AFTER
  fname,
ADD
  COLUMN email VARCHAR(50) NOT NULL
AFTER
  lname,
ADD
  COLUMN password VARCHAR(20) NOT NULL
AFTER
  email,
ADD
  COLUMN photo LONGTEXT NULL DEFAULT NULL
AFTER
  password,
ADD
  COLUMN gender TINYINT(1) NOT NULL
AFTER
  photo;

ALTER TABLE
  myao.admin
ADD
  COLUMN passwordChangedAt DATE NULL
AFTER
  gender,
ADD
  COLUMN passwordResetToken LONGTEXT NULL
AFTER
  passwordChangedAt,
ADD
  COLUMN passwordResetExpires DATE NULL
AFTER
  passwordResetToken;

ALTER TABLE
  myao.surfer
ADD
  COLUMN passwordChangedAt DATE NULL DEFAULT NULL
AFTER
  created_date,
ADD
  COLUMN passwordResetToken LONGTEXT NULL DEFAULT NULL
AFTER
  passwordChangedAt,
ADD
  COLUMN passwordResetExpires DATE NULL DEFAULT NULL
AFTER
  passwordResetToken;

ALTER TABLE
  myao.marketer
ADD
  COLUMN passwordChangedAt DATE NULL DEFAULT NULL
AFTER
  founded_at,
ADD
  COLUMN passwordResetToken LONGTEXT NULL DEFAULT NULL
AFTER
  passwordChangedAt,
ADD
  COLUMN passwordResetExpires DATE NULL DEFAULT NULL
AFTER
  passwordResetToken;

ALTER TABLE
  myao.surfer
ADD
  COLUMN address VARCHAR(50) NULL DEFAULT NULL
AFTER
  passwordResetExpires,
ADD
  COLUMN jop VARCHAR(30) NULL DEFAULT NULL
AFTER
  address,
ADD
  COLUMN education VARCHAR(30) NULL DEFAULT NULL
AFTER
  jop,
ADD
  COLUMN interests VARCHAR(50) NULL DEFAULT NULL
AFTER
  education,
ADD
  COLUMN cover_photo LONGTEXT NULL DEFAULT NULL
AFTER
  interests;

ALTER TABLE
  myao.marketer
ADD
  COLUMN cover_photo LONGTEXT NULL DEFAULT NULL
AFTER
  passwordResetExpires;