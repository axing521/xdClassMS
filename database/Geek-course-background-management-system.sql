# ************************************************************
# Sequel Pro SQL dump
# Version 4541
#
# http://www.sequelpro.com/
# https://github.com/sequelpro/sequelpro
#
# Host: 120.25.3.72 (MySQL 5.7.36)
# Database: xd_course
# Generation Time: 2022-04-20 08:56:05 +0000
# ************************************************************


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;


# Dump of table user
# ------------------------------------------------------------

DROP TABLE IF EXISTS `user`;

CREATE TABLE `user` (
  `id` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `name` varchar(128) DEFAULT NULL COMMENT '昵称',
  `pwd` varchar(124) DEFAULT NULL COMMENT '密码',
  `head_img` varchar(524) DEFAULT NULL COMMENT '头像',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

LOCK TABLES `user` WRITE;
/*!40000 ALTER TABLE `user` DISABLE KEYS */;

INSERT INTO `user` (`id`, `name`, `pwd`, `head_img`)
VALUES
	(1,'大钊','$2a$10$DwVyMUdy6mX23U2pzcavP.mMX54O/v8f8m31acREEOtOajMzf0cOe','https://xd-video-pc-img.oss-cn-beijing.aliyuncs.com/xdclass_pro/default/head_img/18.jpeg'),
	(2,'小D','$2a$10$7m9Mq5vE7fm4N94wLUxh2OCul8vFMgrDvzaebYJP2.ld3oxMQqEvW','https://xd-video-pc-img.oss-cn-beijing.aliyuncs.com/xdclass_pro/default/head_img/12.jpeg'),
	(3,'老王','$2a$10$iC9SBD/ogqMnHiZBPDMsB.iUTlYBB6UO97AHpw2FNELm0itwSoCQ2','https://xd-video-pc-img.oss-cn-beijing.aliyuncs.com/xdclass_pro/default/head_img/15.jpeg'),
	(4,'冰冰','$2a$10$jacNuEUM9dtT5V/B8Ef8f.65cCTZUOwGJcmNGEf03jHgPn9d93EF.','https://xd-video-pc-img.oss-cn-beijing.aliyuncs.com/xdclass_pro/default/head_img/13.jpeg'),
	(5,'anna','$2a$10$ltCNLCUZnLRTslMVcBxagef4LGbQQNuzSxx1LPg5Ia2y0EbU.DbrK','https://xd-video-pc-img.oss-cn-beijing.aliyuncs.com/xdclass_pro/default/head_img/14.jpeg'),
	(6,'张三','$2a$10$vbzFnNJefweElI.FdYpBDOD2WaxRKM.Ikzgb2cE227fudIlicprIm','https://xd-video-pc-img.oss-cn-beijing.aliyuncs.com/xdclass_pro/default/head_img/18.jpeg'),
	(7,'李四','$2a$10$uUbk7k3oJLhdVCdyb2Iedu3.N1zjmjhBh6SfMB8ZkEvSSaLNAxxfy','https://xd-video-pc-img.oss-cn-beijing.aliyuncs.com/xdclass_pro/default/head_img/19.jpeg');

/*!40000 ALTER TABLE `user` ENABLE KEYS */;
UNLOCK TABLES;


# Dump of table video
# ------------------------------------------------------------

DROP TABLE IF EXISTS `video`;

CREATE TABLE `video` (
  `id` int(11) unsigned NOT NULL AUTO_INCREMENT COMMENT '课程id',
  `title` varchar(524) DEFAULT NULL COMMENT '视频标题',
  `course_img` varchar(524) DEFAULT NULL COMMENT '封面图',
  `price` varchar(11) DEFAULT NULL COMMENT '价格,分',
  `point` double(11,2) DEFAULT '8.70' COMMENT '默认8.7，最高10分',
  `category` varchar(50) DEFAULT NULL COMMENT '课程分类',
  `del` int(11) DEFAULT '0' COMMENT '是否删除',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

LOCK TABLES `video` WRITE;
/*!40000 ALTER TABLE `video` DISABLE KEYS */;

INSERT INTO `video` (`id`, `title`, `course_img`, `price`, `point`, `category`, `del`)
VALUES
	(1,'22年新版【前端高级工程师】面试专题第二季','https://file.xdclass.net/video/2022/77-QD/cover.jpeg','109',9.80,'front',1),
	(2,'22年新版-零基础玩转vue3+开发仿美团外卖项目vue视频','https://file.xdclass.net/video/2022/75-Vue3/cover1.jpeg','99',9.50,'front',0),
	(3,'新版webpack5丨带你玩转时下最流行的构建工具','https://file.xdclass.net/video/2022/76-webpack5/cover.jpeg','59',9.30,'front',0),
	(4,'22年新版-玩转Git零基础到进阶实战 git视频急速入门','https://file.xdclass.net/video/2021/74-git/WechatIMG3026.jpeg','39',9.20,'front',0),
	(5,'22年新版-玩转ECMAScript6零基础到进阶实战es6视频','https://file.xdclass.net/video/2021/73-ES6/cover.jpeg','49',9.40,'front',0),
	(6,'22年新-Javascript视频前端零基础到项目实战/js视频','https://file.xdclass.net/video/2021/70-Javascript/cover.jpeg','29',9.20,'front',0),
	(7,'22年新版-玩转html+css前端零基础到项目实战','https://file.xdclass.net/video/2021/69-HTML%2BCSS/cover.jpeg','29',9.40,'front',0),
	(8,'微服务架构-海量数据商用短链平台项目大课【预售特价中】','https://file.xdclass.net/video/2021/71-HLSJCL/cover.jpeg','3699',9.90,'back',0),
	(9,'工业级PaaS云平台+SpringCloudAlibaba 综合项目实战','https://file.xdclass.net/video/2022/62-PaaS/cover.jpeg','1699',9.90,'back',0),
	(10,'22年新版-架构师系列-新版ShardingJDBC分库分表mysql数据库实战','https://file.xdclass.net/video/2022/72-ShardingJDBC/cover.jpeg','129',9.90,'back',0),
	(11,'小滴课堂全栈/后端高级工程师面试专题第一季','https://file.xdclass.net/video/2020/%E9%9D%A2%E8%AF%95%E4%B8%93%E9%A2%98/gw-ms.png','158',9.90,'back',0),
	(12,'高级mysql第二季视频教程/高可用集群/springboot2.5分库分表','https://file.xdclass.net/video/2021/68-MySQL/cover.jpeg','189',9.90,'back',0),
	(13,'三天掌握 Kafka 消息队列 小白到专家之路-大数据教程1','https://file.xdclass.net/video/2021/65-kafka/xzt.png','98',9.90,'back',1),
	(14,'小白到专家-分布式缓存Redis6.X+高可用集群','https://file.xdclass.net/video/2021/64-redis6/cover.jpeg','89',9.90,'back',0),
	(15,'Node.js教程零基础入门到项目实战前端视频教程','https://file.xdclass.net/video/2021/2-zt/47.jpeg','99',9.90,'all',0),
	(16,'小滴课堂超级会员全栈课程免费看','https://file.xdclass.net/video/2022/banner/03.jpeg','1699',9.90,'all',0),
	(17,'ssm新版SpringBoot2.3/spring5/mybatis3','https://file.xdclass.net/video/2020/SSM/zt-ssm.png','68',9.90,'back',0),
	(18,'玩转新版高性能RabbitMQ容器化分布式集群实战','https://file.xdclass.net/video/2021/61-RabbitMq/zt-rabbitmq.jpeg','79',9.20,'back',0);

/*!40000 ALTER TABLE `video` ENABLE KEYS */;
UNLOCK TABLES;



/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;
/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
