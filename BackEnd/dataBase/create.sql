[10:14 PM, 2/21/2022] Omar
Fared:
drop database myao;
create database myao;
use myao;
create table admin
(
  id varchar(12) primary key,
  type smallint NOT NULL,
  fname varchar(20) NOT NULL,
  lname varchar(20) NOT NULL,
  email varchar(50) unique NOT NULL,
  password longtext NOT NULL
);
create table user
(
  id varchar(12) primary key,
  fname varchar(20) NOT NULL,
  lname varchar(20) NOT NULL,
  email varchar(50) unique NOT NULL,
  password longtext NOT NULL,
  photo longtext,
  gender boolean NOT NULL,
  birth_date timestamp NOT NULL,
  closing_admin varchar(12),
  is_active boolean default 1,
  last_login timestamp default now(),
  created_date timestamp default now(),
  job varchar(30),
  cover_photo longtext,
  address varchar(50),
  education varchar(30),
  allow_messaging boolean default true,
  constraint fk_user_admin foreign key (closing_admin) references admin(id) on delete set null
);
create table post
(
  id varchar(12) primary key,
  content longtext NOT NULL,
  user_id varchar(12) NOT NULL,
  created_date timestamp default now(),
  has_media boolean,
  like_counter INT default 0,
  comment_counter INT default 0,
  share_counter INT default 0,
  is_group boolean default false,
  constraint fk_post_user foreign key(user_id) references user(id) on delete cascade
);
create table post_media
(
  id varchar(12) primary key,
  link longtext NOT NULL,
  post_id varchar(12) NOT NULL,
  constraint fk_post_media_post foreign key(post_id) references post(id) on delete cascade
);
create table fav_post
(
  post_id varchar(12),
  user_id varchar(12),
  primary key(post_id,user_id),
  constraint fk_fav_post_post foreign key(post_id) references post(id) on delete cascade,
  constraint fk_fav_post_user foreign key(user_id) references user(id) on delete cascade
);
create table friend
(
  user1_id varchar(12),
  user2_id varchar(12),
  time_accepting timestamp default now(),
  primary key (user1_id,user2_id),
  constraint fk_freind_user1 foreign key(user1_id) references user(id) on delete cascade,
  constraint fk_friend_user2 foreign key(user2_id) references user(id) on delete cascade
);
create table friend_request
(
  sender varchar(12),
  receiver varchar(12),
  time_sending timestamp default now(),
  primary key(sender,receiver),
  constraint fk_freind_request_user1 foreign key(sender) references user(id) on delete cascade,
  constraint fk_freind_request_user2 foreign key(receiver) references user(id) on delete cascade
);
create table post_likes
(
  user_id varchar(12),
  post_id varchar(12),
  type tinyint default 0,
  primary key(user_id,post_id),
  constraint fk_post_likes_post foreign key(post_id) references post(id) on delete cascade,
  constraint fk_post_likes_user foreign key(user_id) references user(id) on delete cascade
);
create table comments
(
  id varchar(12) primary key,
  user_id varchar(12) NOT NULL,
  post_id varchar(12) NOT NULL,
  content longtext NOT NULL,
  comment_time timestamp default now(),
  constraint fk_comments_post foreign key(post_id) references post(id) on delete cascade,
  constraint fk_comments_user foreign key(user_id) references user(id) on delete cascade
);
create table shares
(
  id varchar(12) primary key,
  user_id varchar(12) NOT NULL,
  post_id varchar(12) NOT NULL,
  share_time timestamp default now(),
  content longtext NOT NULL,
  constraint fk_shares_post foreign key(post_id) references post(id) on delete cascade,
  constraint fk_shares_user foreign key(user_id) references user(id) on delete cascade
);
create table comment_likes(
	comment_id varchar(12) primary key,
    user_id varchar(12) NOT NULL,
    type tinyint default 0,
    constraint fk_comment_likes_user foreign key(user_id) references user(id) on delete cascade,
	constraint fk_comment_likes_comment foreign key(user_id) references comments(…
[10:14 PM, 2/21/2022] Omar
Fared:
drop database myao;
create database myao;
use myao;
create table admin
(
  id varchar(12) primary key,
  type smallint NOT NULL,
  fname varchar(20) NOT NULL,
  lname varchar(20) NOT NULL,
  email varchar(50) unique NOT NULL,
  password longtext NOT NULL
);
create table user
(
  id varchar(12) primary key,
  fname varchar(20) NOT NULL,
  lname varchar(20) NOT NULL,
  email varchar(50) unique NOT NULL,
  password longtext NOT NULL,
  photo longtext,
  gender boolean NOT NULL,
  birth_date timestamp NOT NULL,
  closing_admin varchar(12),
  is_active boolean default 1,
  last_login timestamp default now(),
  created_date timestamp default now(),
  job varchar(30),
  cover_photo longtext,
  address varchar(50),
  education varchar(30),
  allow_messaging boolean default true,
  constraint fk_user_admin foreign key (closing_admin) references admin(id) on delete set null
);
create table post
(
  id varchar(12) primary key,
  content longtext NOT NULL,
  user_id varchar(12) NOT NULL,
  created_date timestamp default now(),
  like_counter INT default 0,
  comment_counter INT default 0,
  share_counter INT default 0,
  is_group boolean default false,
  constraint fk_post_user foreign key(user_id) references user(id) on delete cascade
);
create table post_media
(
  id varchar(12) primary key,
  link longtext NOT NULL,
  post_id varchar(12) NOT NULL,
  constraint fk_post_media_post foreign key(post_id) references post(id) on delete cascade
);
create table fav_post
(
  post_id varchar(12),
  user_id varchar(12),
  primary key(post_id,user_id),
  constraint fk_fav_post_post foreign key(post_id) references post(id) on delete cascade,
  constraint fk_fav_post_user foreign key(user_id) references user(id) on delete cascade
);
create table friend
(
  user1_id varchar(12),
  user2_id varchar(12),
  time_accepting timestamp default now(),
  primary key (user1_id,user2_id),
  constraint fk_freind_user1 foreign key(user1_id) references user(id) on delete cascade,
  constraint fk_friend_user2 foreign key(user2_id) references user(id) on delete cascade
);
create table friend_request
(
  sender varchar(12),
  receiver varchar(12),
  time_sending timestamp default now(),
  primary key(sender,receiver),
  constraint fk_freind_request_user1 foreign key(sender) references user(id) on delete cascade,
  constraint fk_freind_request_user2 foreign key(receiver) references user(id) on delete cascade
);
create table post_likes
(
  user_id varchar(12),
  post_id varchar(12),
  type tinyint default 0,
  primary key(user_id,post_id),
  constraint fk_post_likes_post foreign key(post_id) references post(id) on delete cascade,
  constraint fk_post_likes_user foreign key(user_id) references user(id) on delete cascade
);
create table comments
(
  id varchar(12) primary key,
  user_id varchar(12) NOT NULL,
  post_id varchar(12) NOT NULL,
  content longtext NOT NULL,
  comment_time timestamp default now(),
  constraint fk_comments_post foreign key(post_id) references post(id) on delete cascade,
  constraint fk_comments_user foreign key(user_id) references user(id) on delete cascade
);
create table shares
(
  id varchar(12) primary key,
  user_id varchar(12) NOT NULL,
  post_id varchar(12) NOT NULL,
  share_time timestamp default now(),
  content longtext NOT NULL,
  constraint fk_shares_post foreign key(post_id) references post(id) on delete cascade,
  constraint fk_shares_user foreign key(user_id) references user(id) on delete cascade
);
create table comment_likes
(
  comment_id varchar(12) primary key,
  user_id varchar(12) NOT NULL,
  type tinyint default 0,
  constraint fk_comment_likes_user foreign key(user_id) references user(id) on delete cascade,
  constraint fk_comment_likes_comment foreign key(user_id) references comments(id) on delete cascade
);

create table notification
(
  message text NOT NULL,
  user_id varchar(12) NOT NULL,
  notification_time timestamp default now(),
  constraint fk_notification_user foreign key(user_id) references user(id) on delete cascade
);

create table chat_rooms
(
  sender varchar(12) NOT NULL,
  receiver varchar(12) NOT NULL,
  chat_id varchar(12) unique,
  primary key(sender,receiver),
  constraint fk_chat_rooms_user1 foreign key(sender) references user(id) on delete cascade,
  constraint fk_chat_rooms_user2 foreign key(receiver) references user(id) on delete cascade
);
create table chat
(
  chat_id varchar(12) NOT NULL,
  id varchar(12) primary key,
  message longtext NOT NULL,
  message_time timestamp default now(),
  constraint fk_chat_chat_rooms foreign key(chat_id) references chat_rooms(chat_id) on delete cascade
);
create table `group`
(
    id varchar
(12) primary key,
    photo longtext,
    cover_photo longtext,
    name varchar
(50) NOT NULL,
    description longtext,
    acception_rule decimal
(1,0) default 0,
    is_private boolean default 0,
    join_description longtext
);
create table group_admins
(
  group_id varchar(12) NOT NULL,
  user_id varchar(12) NOT NULL,
  privilege decimal(1,0) NOT NULL,
  primary key(group_id,user_id),
  constraint fk_group_admins_user foreign key(user_id) references user(id) on delete cascade,
  constraint fk_group_admins_group  foreign key(group_id) references
  `group`
  (id) on
  delete cascade
);
  create table group_posts
  (
    group_id varchar(12) NOT NULL,
    post_id varchar(12) NOT NULL,
    is_accepted boolean default 1,
    primary key(group_id,post_id),
    constraint fk_group_posts_post foreign key(post_id) references post(id) on delete cascade,
    constraint fk_group_posts_group  foreign key(group_id) references
    `group`
    (id) on
    delete cascade
);
    create table group_users
    (
      group_id varchar(12) NOT NULL,
      user_id varchar(12) NOT NULL,
      primary key(group_id,user_id),
      constraint fk_group_users_user foreign key(user_id) references user(id) on delete cascade,
      constraint fk_group_users_group  foreign key(group_id) references
      `group`
      (id) on
      delete cascade
);


      #################################### Triggers ########################################


DELIMITER $$
      CREATE TRIGGER like_post
BEFORE
      INSERT ON
      post_likes
      FOR
      EACH
      ROW
      BEGIN
        UPDATE post SET like_counter = like_counter + 1 WHERE id = NEW.post_id;
      END
      $$
DELIMITER ;	
DELIMITER $$
      CREATE TRIGGER unlike_post
BEFORE
      DELETE ON post_likes FOR EACH
      ROW
      BEGIN
        UPDATE post SET like_counter = like_counter - 1 WHERE id = OLD.post_id;
      END
      $$
DELIMITER ;	
DELIMITER $$
      CREATE TRIGGER share_post
BEFORE
      INSERT ON
      shares
      FOR
      EACH
      ROW
      BEGIN
        UPDATE post SET share_counter = share_counter + 1 WHERE id = NEW.post_id;
      END
      $$
DELIMITER ;	
DELIMITER $$
      CREATE TRIGGER unshare_post
BEFORE
      DELETE ON shares FOR EACH
      ROW
      BEGIN
        UPDATE post SET share_counter = share_counter - 1 WHERE id = OLD.post_id;
      END
      $$
DELIMITER ;	
DELIMITER $$
      CREATE TRIGGER comment_post
BEFORE
      INSERT ON
      comments
      FOR
      EACH
      ROW
      BEGIN
        UPDATE post SET comment_counter = comment_counter + 1 WHERE id = NEW.post_id;
      END
      $$
DELIMITER ;	
DELIMITER $$
      CREATE TRIGGER uncomment_post
BEFORE
      DELETE ON comments FOR EACH
      ROW
      BEGIN
        UPDATE post SET comment_counter = comment_counter - 1 WHERE id = OLD.post_id;
      END
      $$
DELIMITER ;