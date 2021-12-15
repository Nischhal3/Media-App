-- MySQL dump 10.14  Distrib 5.5.68-MariaDB, for Linux (x86_64)
--
-- Host: localhost    Database: media_app_user
-- ------------------------------------------------------
-- Server version	5.5.68-MariaDB

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `collection_db`
--

DROP TABLE IF EXISTS `collection_db`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `collection_db` (
  `collection_id` int(11) NOT NULL AUTO_INCREMENT,
  `collection_title` varchar(30) NOT NULL,
  `collection_description` text NOT NULL,
  `image` text,
  PRIMARY KEY (`collection_id`),
  UNIQUE KEY `collection_title` (`collection_title`)
) ENGINE=InnoDB AUTO_INCREMENT=17 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `collection_db`
--

LOCK TABLES `collection_db` WRITE;
/*!40000 ALTER TABLE `collection_db` DISABLE KEYS */;
INSERT INTO `collection_db` VALUES (1,'Nature','Art involving nature can be done simply to display the beauty of the natural world around us, to make scientific observations in an environment, or to open our minds to philosophical ideas about our own connection to nature and beyond. ... In other words, art is the missing voice of what nature lacks to speak.','10e4910b7f6bc33def9bad4548203391'),(2,'Painting','Painting, the expression of ideas and emotions, with the creation of certain aesthetic qualities, in a two-dimensional visual language. The elements of this language,its shapes, lines, colours, tones, and textures are used in various ways to produce sensations of volume, space, movement, and light on a flat surface','744d9115f6e93dcae8861c0db6ebba79'),(3,'Photography','Photography exploits vulnerabilities of the human visual perception and can make us experience emotions that move us and compel us to do things that we otherwise would not even think of.','7c86ab22c28a5980efa66e97d400093d'),(4,'Contemporary','Contemporary art is the art of today, produced by artists who are living in our time. It provides opportunities to reflect on society and the issues that are important to us and the world.','c9dfecbd0b9bdf7516c3e34aa18cd760'),(5,'Sculpture','Sculpture, an artistic form in which hard or plastic materials are worked into three-dimensional art objects. The designs may be embodied in freestanding objects, in reliefs on surfaces, or in environments ranging from tableaux to contexts that envelop the spectator.','9481b15538d561e4a9f569b05a652ba2'),(6,'Modern','Modern art is the creative world\'s response to the rationalist practices and perspectives of the new lives and ideas provided by the technological advances of the industrial age that caused contemporary society to manifest itself in new ways compared to the past.','fc960628867b82cd16b572616590b1e8'),(7,'Digital','Have no fear of perfection, you\'ll never reach it. Digital design is like painting, except the paint never dries. Creativity is nothing but a mind set free.','865edceaa53bf7869b0170e34ea22f16'),(8,'FineArt','Fine arts, refers to an art form practised mainly for its aesthetic value and its beauty rather than its functional value. It is the discipline of breaking rules.','713e17e79a641126261604660b951aa5'),(9,'Conceptual','Conceptual art where the idea behind the work is more important than the finished art object.Great art or good art, is when you look at it, experience it and it stays in your mind.','fbbaa27f1eae1687c158f0c98f9a9fa9'),(10,'Decorative','Decorative art, any of those arts that are concerned with the design and decoration of objects that are chiefly prized for their utility, rather than for their purely aesthetic qualities','e0ea5fbff2497b7ce5c337bb77ecc4af'),(11,'Anime','The world isn\'t perfect. But it\'s there for us, doing the best it can....that\'s what makes it so damn beautiful.~ Roy Mustang (Full Metal Alchemist)','a93ec57c3f09a32be8238e4a7944f82e'),(12,'NewMedia','New Media Art is a comprehensive term that encompasses art forms that are either produced, modified, and transmitted by means of new media/digital technologies.','3b740bd3fb3b65caaad542795d98b111'),(14,'Landscape','Landscape art is the depiction of natural scenery such as mountains, valleys, trees, rivers, and forests, especially where the main subject is a wide view with its elements arranged into a coherent composition.','497ca4b71fd3d93a16da2124e0bf8131'),(15,'Impressionism','Impressionism art shows life-like subjects painted in a broad, rapid style, with brushstrokes that are easily seen and colours that are often bright.','a06fe7bf68c887b0987c73cd5509c021'),(16,'Drawing','The art or technique of producing images on a surface, usually paper, by means of marks, usually of ink, graphite, chalk, charcoal, or crayon.','630d89cb2c9ca7bf1e862e9fdaa55213');
/*!40000 ALTER TABLE `collection_db` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `comment_db`
--

DROP TABLE IF EXISTS `comment_db`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `comment_db` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `comments` text,
  `comment_date` date DEFAULT NULL,
  `user_id` int(11) DEFAULT NULL,
  `image_id` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `user_id` (`user_id`),
  KEY `image_id` (`image_id`),
  CONSTRAINT `comment_db_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `user_db` (`user_id`),
  CONSTRAINT `comment_db_ibfk_2` FOREIGN KEY (`image_id`) REFERENCES `image_db` (`image_id`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=47 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `comment_db`
--

LOCK TABLES `comment_db` WRITE;
/*!40000 ALTER TABLE `comment_db` DISABLE KEYS */;
INSERT INTO `comment_db` VALUES (4,'hello','2021-12-14',75,105),(5,'fefefef','2021-12-14',75,105),(6,'fefe','2021-12-14',75,105),(8,'hfhfhf','2021-12-14',75,105),(10,'feffefe','2021-12-14',75,105),(13,'test comment','2021-12-14',101,67),(14,'test comment','2021-12-14',101,67),(16,'another test comment','2021-12-14',101,67),(17,'comment 1','2021-12-14',101,103),(18,'comment2','2021-12-14',101,103),(19,'coffe','2021-12-14',101,106),(21,'test comment','2021-12-14',101,105),(23,'tea','2021-12-14',101,106),(24,'coffee','2021-12-14',101,106),(25,'another test comment','2021-12-14',101,105),(26,'Bunnie is cute','2021-12-14',101,88),(27,'Yesss Bunnie is always cute','2021-12-14',63,88),(31,'hello ','2021-12-14',63,105),(32,'hihi tranh t dep vl','2021-12-15',74,105),(33,'tranh may dep do','2021-12-15',4,103),(35,'trong ok a','2021-12-15',101,108),(36,'hehe','2021-12-15',103,103),(40,'This is beautiful.','2021-12-15',75,103),(45,'fefefef','2021-12-15',61,123),(46,'gggg','2021-12-15',61,103);
/*!40000 ALTER TABLE `comment_db` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `image_db`
--

DROP TABLE IF EXISTS `image_db`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `image_db` (
  `image_id` int(11) NOT NULL AUTO_INCREMENT,
  `image_title` varchar(50) NOT NULL,
  `image_description` text NOT NULL,
  `image_file` text NOT NULL,
  `user_id` int(11) DEFAULT NULL,
  `collection_id` int(11) DEFAULT NULL,
  `image_date` date DEFAULT NULL,
  PRIMARY KEY (`image_id`),
  KEY `fk_type` (`user_id`),
  KEY `collection_id` (`collection_id`),
  CONSTRAINT `fk_type` FOREIGN KEY (`user_id`) REFERENCES `user_db` (`user_id`),
  CONSTRAINT `image_db_ibfk_1` FOREIGN KEY (`collection_id`) REFERENCES `collection_db` (`collection_id`)
) ENGINE=InnoDB AUTO_INCREMENT=124 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `image_db`
--

LOCK TABLES `image_db` WRITE;
/*!40000 ALTER TABLE `image_db` DISABLE KEYS */;
INSERT INTO `image_db` VALUES (43,'Winter','Dark and cold winter','f8ea9e2e79f149fbc6113c309d492f0b',4,14,'1959-05-15'),(45,'Summer','Flower of summer','e0c55ecc73a0bc7f58ff70ba9d189f31',4,14,'2012-12-05'),(46,'Halong Bay','The most beautiful place in Vietnam','81a29b34c8aa995abb6247ff63d86cea',4,14,'2002-05-05'),(47,'Blue moutain','It\'s beautiful but it\'s sad...','6ea1a12df62aa96554e9c7b4939be937',4,14,'2012-05-14'),(48,'On the hill','Dream house of everyone','70533733b70c70cb966bd4f77ce33aa5',4,14,'2001-07-18'),(62,'Vennus of Willendorf','The ur sculpture of art history, this tiny figurine measuring just over four inches in height was discovered in Austria in 1908. Nobody knows what function it served, but guesswork has ranged from fertility goddess to masturbation aid','476ce2431e2a969140e9ee9ba798f3eb',4,5,'1001-01-01'),(63,'Something','Photography is the art, application, and practice of creating durable images by recording light, either electronically by means of an image sensor, or chemically by means of a light-sensitive material such as photographic film. It is employed in many fields of science, manufacturing (e.g., photolithography), and business, as well as its more direct uses for art, film and video production, recreational purposes, hobby, and mass communication.','f7e7b8355ef6b2ba66cdad9dd67183c8',4,6,'2021-12-14'),(64,'Michelangelo David','One of the most iconic works in all of art history, Michelangelo’s David had its origins in a larger project to decorate the buttresses of Florence’s great cathedral, the Duomo, with a group of figures taken from the Old Testament','6eea33ce29ae94aa0a73051ff206b014',4,5,'1501-01-01'),(67,'Irises','One of the most iconic works of Vincent van Gogh','419e8b1aa64abbdcc9cb8f7cf784fa0c',74,2,'1889-01-01'),(83,'friends','Friends and animals','d1f80edc0b77cafa0ec5e48ccc22813d',63,16,'2021-12-11'),(84,'dog','dog is a pet','7333c3ec5210f2a1ef135e7047474e04',63,16,'2021-12-11'),(85,'Almond blossom','One of the most iconic works of Vincent van Gogh','1642bdc99a5cb54401251d414f36db3d',74,5,'1888-01-01'),(88,'Bunnie','Bunnie in the house ','dbfacc8fbb578e7e1b1cb2224be6bff9',63,16,'2021-12-11'),(103,'Sun flowers','Van Gogh’s paintings of Sunflowers are among his most famous. He did them in Arles, in the south of France, in 1888 and 1889. Vincent painted a total of five large canvases with sunflowers in a vase, with three shades of yellow ‘and nothing else’. In this way, he demonstrated that it was possible to create an image with numerous variations of a single colour, without any loss of eloquence.','6ac1ce29d72b1c2b5013f6525f456e25',74,2,'2021-12-02'),(104,'Cafe terrace at night','Café Terrace at Night was one of the first nocturnal scenes painted by Van Gogh at the time of his stay in Arles. This raises a lot of questions for most people who are looking at it, from how it was made to what kind of meaning it is supposed to represent.','775f77ea86f795963c4213d4198bc9ad',74,2,'1982-07-14'),(105,'Starry night over the Rhone','Starry Night Over the Rhone was painted at a spot on the banks of river which was only a minute or two\'s walk from the The Yellow House on the Place Lamartine which Van Gogh was renting at the time. The night sky and the effects of light at night provided the subject for some of his more famous paintings, including The Starry Night, the most famous Van Gogh night stars painting.','be9c60ef26a87292bc5ee6243681565f',74,2,'2021-12-01'),(106,'The Starry night','Starry Night is one of the most recognized pieces of art in the world. It is absolutely everywhere, too. It can be seen on coffee, mugs, t-shirts, towels, magnets, etc. Honestly, it sometimes feels as if the painting’s fame has exceeded that of its creator. It is a magnificent piece of art. That Starry Night resonates with so many people is a testament to how its beauty is timeless and universal.','06d2678f6f9beae55081efbd46a31ac1',74,2,'1888-04-01'),(108,'something','safasfa','1d47a4616d757a9983a6432dc75261bd',86,6,'2021-12-15'),(109,'wgewge','asdadsads','034e6768aea9c92dacf10cf091381b7a',86,6,'2021-12-10'),(110,'asasdasas','safasasas','dc60c30687a3ea535994c44a23cb9264',86,6,'2021-12-08'),(111,'errgegregr','regwew','aea0f6956b0796e4fcf78f3f17e357b7',86,6,'2021-12-16'),(112,'wgetwerqe','rqweqweq','25bdd39ea6033da436eeb838c7b8cad3',86,6,'2021-12-02'),(113,'thrhw','wetewtw','ba0d53780dd10e0e2f6959575371b4fb',NULL,6,'2021-12-03'),(114,'dsvavd','acascac','efda0eacf2d8a7ec6b5a52c436e6944c',98,6,'2021-12-08'),(123,'Cat','Update from FE','46da0714814efb38bd98c781266590b8',61,1,'2021-12-17');
/*!40000 ALTER TABLE `image_db` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `like_db`
--

DROP TABLE IF EXISTS `like_db`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `like_db` (
  `likes` int(11) DEFAULT NULL,
  `user_id` int(11) NOT NULL DEFAULT '0',
  `image_id` int(11) NOT NULL DEFAULT '0',
  PRIMARY KEY (`user_id`,`image_id`),
  KEY `image_like` (`image_id`),
  CONSTRAINT `image_like` FOREIGN KEY (`image_id`) REFERENCES `image_db` (`image_id`) ON DELETE CASCADE,
  CONSTRAINT `like_db_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `user_db` (`user_id`),
  CONSTRAINT `like_db_ibfk_2` FOREIGN KEY (`image_id`) REFERENCES `image_db` (`image_id`) ON DELETE CASCADE,
  CONSTRAINT `user_like` FOREIGN KEY (`user_id`) REFERENCES `user_db` (`user_id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `like_db`
--

LOCK TABLES `like_db` WRITE;
/*!40000 ALTER TABLE `like_db` DISABLE KEYS */;
INSERT INTO `like_db` VALUES (1,4,85),(1,4,103),(1,4,104),(1,4,105),(1,61,103),(1,63,43),(1,63,45),(1,63,46),(1,63,67),(1,63,83),(1,63,88),(1,63,106),(1,74,83),(1,74,85),(1,74,88),(1,74,103),(1,74,104),(1,74,105),(1,74,106),(1,75,64),(1,75,67),(1,84,62),(1,84,67),(1,84,103),(1,84,104),(1,84,105),(1,84,106),(1,101,88),(1,102,62),(1,103,103);
/*!40000 ALTER TABLE `like_db` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `user_db`
--

DROP TABLE IF EXISTS `user_db`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `user_db` (
  `user_id` int(11) NOT NULL AUTO_INCREMENT,
  `first_name` varchar(30) NOT NULL,
  `last_name` varchar(30) NOT NULL,
  `email` varchar(40) NOT NULL,
  `password` text NOT NULL,
  `role` int(11) NOT NULL,
  `user_image` text,
  `user_description` text,
  PRIMARY KEY (`user_id`)
) ENGINE=InnoDB AUTO_INCREMENT=104 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `user_db`
--

LOCK TABLES `user_db` WRITE;
/*!40000 ALTER TABLE `user_db` DISABLE KEYS */;
INSERT INTO `user_db` VALUES (3,'test','test','test@gmail.com','$2a$10$BWRbwsmroi5xqoGao.0o0.BiTZHrFP9DNQNzKn5S5eD6mqXGc.7kG',1,NULL,NULL),(4,'My','Mai','mymai@gmail.com','$2a$10$mgvG6WNIlsZJ2EithyrD2OVVqYdMqfsJzczFet4VwYmop/eTYai02',1,NULL,'This is my profile page'),(59,'Giang','Nguyen','test@abc.etc','$2a$10$Su2uarDmx5fEVNMLQNMAguUNjf3Sx4LsUfTdgfakocbtlCTIhIZki',1,NULL,NULL),(61,'Admin','admin','admin@metropolia.fi','$2a$10$GLI4aa1nxrNBTJ9v97WYuuvxgCyUL.ZyRMme0UuBEmJDhjEvXiEom',0,NULL,NULL),(63,'heo ','heo ','test@test.com','$2a$10$4cVSSzAQ/jTazigifMPqAey318JD4Ou8vs6mmgfHUuVIWfaQLKDhW',1,NULL,'heo heo xinh dep heo heo de thuong'),(64,'nomore','test','again@again.com','$2a$10$j85XFcmwnG.6Gdbhm8pknu6StpIBIhgomhrpCmhcTTSiQAPxpvSj.',1,NULL,NULL),(66,'patrick','patricka','patrick@test.com','$2a$10$VlrG39EX7M/kQbd1iuKonua80DH3Te7QvKl4cHPVWs1pieN8vqjhe',1,NULL,NULL),(67,'Ilkka','Kylmäniemi','Ilkka@Kylma.com','$2a$10$LPi4v.bmWioDji1vkY9HmuABSQ9.bZoG13CtxImKevzFwRanxQgzq',1,NULL,NULL),(69,'Giang','Nguyen','giang@nguyen.com','$2a$10$XhTVs.dSQrAO6HzbVmSZQenl8vk4M4etAmFl2gl53VcBFidYLa1OW',1,NULL,NULL),(70,'deploy','test','deploy@abc.com','$2a$10$L3iuqfCEqJlhfuurlMtpIeMufRZAZrg3KAVTe6CpA0Xa3RTBkl5cC',1,NULL,NULL),(71,'Trang','nguyen','Trang.nguyen6@metropolia.fi','$2a$10$R7aGR.cHfxqA3amgO6ixhufqhQtgDLolGne10lhu5puEw/bl5NVlu',1,NULL,NULL),(72,'Da Vinci','Leonardo','leonardo@vinci.com','$2a$10$UHL0tU46Gb2qa9HIOVI6RORp1RNDU37/2hv0s/9mn3xh0QaycjbmS',1,NULL,NULL),(73,'Johannes ','Vermeer','johan@gmail.com','$2a$10$dYSuJxXZ3SAcwHMbaym7M.1BxveRPhuznIcwVt7ifUI3ezGRz1Qpe',1,NULL,NULL),(74,'Vincent v.','Gogh','vincent@gmail.com','$2a$10$2q.Upq5CF1sZ5yPPUP7fIetoe7La5lseA1pM.NSWaswbPzHKnF7sa',1,NULL,'This is my profile page'),(75,'Nischhal','Shrestha','nischhal@metropolia.fi','$2a$10$Cz7qdkVqG8fuDCLoj5XYYedGu0c5I0lMmZWRhedM/n5xTMEBzCdTS',1,NULL,'Hello how are you!'),(78,'jason','derulo','jaason.deruuulo@heehee.com','$2a$10$q3RlaaK34Q291xAF.PJ5Z.bo3X8H0n.v3Epwjk52OIPXQUitC.b.6',1,NULL,NULL),(79,'meo','meo','meomeo@mail.com','$2a$10$/RDLyBfTqQ7I4lOluhg4NOHxu9TS6uUqPcjwdB7jR8v5520UQL3uW',1,NULL,NULL),(80,'Sirja','Woopwoop','woopwopp@gmail.com','$2a$10$Prt6vjPC/P.3oA5JLmaSr.389Vx21vZFgE.GO6IqzdTecgAuJPSI6',1,NULL,NULL),(81,'András','Ádám','andrasa@metropolia.fi','$2a$10$//VYNJeBxtKqo0JCvttXe.oADeKZm/0POjQsc6h7ezcEQIgbIqqR6',1,NULL,NULL),(82,'ali','fah','alifah@alifa.com','$2a$10$4YSG.vnzBixrWoD74056QuekoHjPj6c8ZWiTP8nwsQePy8j9QTn1u',1,NULL,NULL),(83,'khkjhkj','iguggjgjhgjhg','jvjhgvjhgjvjvjvg@gmail.com','$2a$10$i2ar7D6EOSuMKqMMckMFCOWnJX0Ch1RntJEAhZJnPZPNQN.OkNyJW',1,NULL,NULL),(84,'Mikko','Kakkonen','mikko@metropolia.fi','$2a$10$GEJT4ksJeu6UENwSQogG1ukOAyfT6mkobdse60FgxI/qsPK9NhdZu',1,NULL,NULL),(85,'Henka','Pikkonen','henkka@metropolia.fi','$2a$10$/zupXXUORO7tcDqWHWAZ3OXKQRscjZdhCAMo035vgdU7EFgOiS7Ra',1,NULL,NULL),(86,'Mimi','meomeo','mimi@gmail.com','$2a$10$t8tmYVqFeg5vMH9MQqRxsupjmYpjksJXMRKSUeTaJEeueXMCasvMe',1,NULL,NULL),(87,'Kalle','Kal','kalle@metropolia.fi','$2a$10$OlsLcRYt78UyjFlAmWye3.6mNJ16tt3Elx5JdPtl70Q8Y0t9sekUW',1,NULL,NULL),(88,'Test','Test2','test10@metropolia.fi','$2a$10$o8612oSv7YB3u0dYc1uC.OMr3xFoUOz2anpwNNzISjlYKO/BppdyK',1,NULL,NULL),(89,'Mini','Bunnie','minibunnie@gmail.com','$2a$10$uyoM5ZH35p4Br9/NpdVyXOOJzsZJtYV8vTIWSaSC8a8ZFWLUUXKsa',1,NULL,NULL),(90,'test','testy','testy@gmail.com','$2a$10$19AMbmX3ETG4KbRjOF.bi.NxgoBp8hu2/SKBwwG1tGZ13vMB.Thwq',1,NULL,NULL),(91,'abc','abc','abc@gmail.com','$2a$10$3TDL8BDQooN5lMk81jljL.eczgXG7sVx.DYynP4p4e.9PHpqolFae',1,NULL,NULL),(92,'Mikka','boy','mikka@metropolia.fi','$2a$10$tNSqBuYHQSLGl3X6AlAOgOqkRXoIiYBcj9xBmxak1Qnsu.S6VbHsq',1,NULL,NULL),(93,'Hello','hello','hello@metropolia.fi','$2a$10$RUhQH/yQ6ZsHfo3Tq1nJ0ujlk0C10bnjWpdCvNAyjk8JkRb54buP2',1,NULL,NULL),(94,'test','testi','testi@gmail.com','$2a$10$GSrzKUv56xrFkv2a9CYNuuO9a8Uv.U7TJKpjXoDxUjRV5zzysUIka',1,NULL,NULL),(95,'Testi','testi','test9@gmail.com','$2a$10$odPPkaZf6Mt2r3qauVOFROP87ZMEXAHoLFS0EdWDo2SE1aeUNhjKm',1,NULL,NULL),(96,'test','new','new@test.com','$2a$10$1aB6B7YJVYEL8D/J0pXZ4uPy7JqnvPBGjkzaM0BGWUn6eYB/a.s06',1,NULL,NULL),(97,'Test','Testi','test12@gmail.com','$2a$10$KbjekcsJV6UAwx2TjtBkOeb2tpbShsOCmF2gLJpYCyWwRivVzWWJe',1,NULL,NULL),(98,'test','test','chanvl@gmail.com','$2a$10$SP5fA/hC4H85l2NaRhbvi.sn0oE11fDGVe4mQo06OEgIchwufUQ3u',1,NULL,NULL),(99,'Test','Testi','test15@gmail.com','$2a$10$rNXkuSmaGovmFTDevoHo6ef.MYguUfbZw2PR5ZykQ6ova1BSXQIIa',1,NULL,NULL),(100,'test','test','test11@gmail.com','$2a$10$AnughIbxZAUbL2g8JYmGDuhjxpLtoTqLR9d8Siazurv9lV3WvLW.e',1,NULL,NULL),(101,'abc','xyz','abc@xyz.com','$2a$10$A9ZjyktzBeT0HRXrkN4tkO0QET0azdFcx2PMzHKyaKrWneFhVMp8O',1,NULL,NULL),(102,'Test','Test','test@metropolia.fi','$2a$10$7qn/FPYNh9BWDx2Hin0K/Om7CrH8O5J993RytAwfW41VRYMf3Dkmy',1,NULL,'Hello how are you'),(103,'Test15','test','test25@gmail.com','$2a$10$Bg.DCG7aukINehcKTSp2d.u.6rqvM8zobi3Jv3mTwBPUwklme7uIO',1,NULL,NULL);
/*!40000 ALTER TABLE `user_db` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2021-12-15 13:01:56
