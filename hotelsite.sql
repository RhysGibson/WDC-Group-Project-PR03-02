-- MySQL dump 10.16  Distrib 10.2.15-MariaDB, for Win64 (AMD64)
--
-- Host: 127.0.0.1    Database: hotelsite
-- ------------------------------------------------------
-- Server version	10.2.15-MariaDB

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
-- Current Database: `hotelsite`
--

CREATE DATABASE /*!32312 IF NOT EXISTS*/ `hotelsite` /*!40100 DEFAULT CHARACTER SET latin1 */;

USE `hotelsite`;

--
-- Table structure for table `bookings`
--

DROP TABLE IF EXISTS `bookings`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `bookings` (
  `bookingid` int(11) NOT NULL AUTO_INCREMENT,
  `userid` int(11) DEFAULT NULL,
  `hotelid` int(11) DEFAULT NULL,
  `datein` date DEFAULT NULL,
  `dateout` date DEFAULT NULL,
  `roomnum` int(11) DEFAULT NULL,
  `imagefile` varchar(100) DEFAULT NULL,
  `cost` int(11) DEFAULT NULL,
  `paymentfulfilled` tinyint(4) DEFAULT 1,
  PRIMARY KEY (`bookingid`),
  KEY `hotelid_idx` (`hotelid`),
  KEY `userid_idx` (`userid`),
  CONSTRAINT `bookingshotelid` FOREIGN KEY (`hotelid`) REFERENCES `hotels` (`hotelid`) ON DELETE CASCADE ON UPDATE NO ACTION,
  CONSTRAINT `bookingsuserid` FOREIGN KEY (`userid`) REFERENCES `users` (`userid`) ON DELETE CASCADE ON UPDATE NO ACTION
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `bookings`
--

LOCK TABLES `bookings` WRITE;
/*!40000 ALTER TABLE `bookings` DISABLE KEYS */;
/*!40000 ALTER TABLE `bookings` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `deals`
--

DROP TABLE IF EXISTS `deals`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `deals` (
  `hotelid` int(11) NOT NULL,
  `info` varchar(150) DEFAULT NULL,
  KEY `hotelid_idx` (`hotelid`),
  CONSTRAINT `dealshotelid` FOREIGN KEY (`hotelid`) REFERENCES `hotels` (`hotelid`) ON DELETE CASCADE ON UPDATE NO ACTION
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `deals`
--

LOCK TABLES `deals` WRITE;
/*!40000 ALTER TABLE `deals` DISABLE KEYS */;
/*!40000 ALTER TABLE `deals` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `hotelfilters`
--

DROP TABLE IF EXISTS `hotelfilters`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `hotelfilters` (
  `hotelid` int(11) NOT NULL,
  `kingbed` tinyint(4) DEFAULT 0,
  `queenbed` tinyint(4) DEFAULT 0,
  `singlebed` tinyint(4) DEFAULT 0,
  `breakfast` tinyint(4) DEFAULT 0,
  `freewifi` tinyint(4) DEFAULT 0,
  `pool` tinyint(4) DEFAULT 0,
  KEY `hotelid_idx` (`hotelid`),
  CONSTRAINT `filtershotelid` FOREIGN KEY (`hotelid`) REFERENCES `hotels` (`hotelid`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `hotelfilters`
--

LOCK TABLES `hotelfilters` WRITE;
/*!40000 ALTER TABLE `hotelfilters` DISABLE KEYS */;
/*!40000 ALTER TABLE `hotelfilters` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `hotels`
--

DROP TABLE IF EXISTS `hotels`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `hotels` (
  `hotelid` int(11) NOT NULL AUTO_INCREMENT,
  `userid` int(11) DEFAULT NULL,
  `hotelname` varchar(45) NOT NULL,
  `hoteldescription` varchar(300) DEFAULT NULL,
  `extendeddescription` varchar(600) DEFAULT NULL,
  `hotelcost` int(11) DEFAULT NULL,
  `additionalinfo` varchar(100) DEFAULT NULL,
  `latitude` double DEFAULT NULL,
  `longitude` double DEFAULT NULL,
  `userrating` int(11) DEFAULT NULL,
  `hotelrating` int(11) DEFAULT NULL,
  PRIMARY KEY (`hotelid`),
  UNIQUE KEY `hotelid_UNIQUE` (`hotelid`),
  KEY `userid_idx` (`userid`),
  CONSTRAINT `userid` FOREIGN KEY (`userid`) REFERENCES `users` (`userid`) ON DELETE SET NULL ON UPDATE NO ACTION
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `hotels`
--

LOCK TABLES `hotels` WRITE;
/*!40000 ALTER TABLE `hotels` DISABLE KEYS */;
INSERT INTO `hotels` VALUES (1,5,'Hilton Adelaide','The Hilton Hotel is located in a central location within Adelaide.','Hilton is a global brand founded by Conrad Hilton. The Hilton Adelaide is one of Adelaide\'s finest hotels. It\'s central location in the CBD allows you to commute around the city easily, letting you make the most of your time in Adelaide. Whether you\'re looking for a good time in the city or just a nice play to stay for a while, the Hilton Adelaide has you covered. Our staff will be sure to take care of any of your needs to the best of our ability to leave you with a satisfied experience.',500,'Free Wifi and Complimentary Breakfast Everyday.',-34.929143,138.5989062,5,5);
/*!40000 ALTER TABLE `hotels` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `reviews`
--

DROP TABLE IF EXISTS `reviews`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `reviews` (
  `reviewid` int(11) NOT NULL AUTO_INCREMENT,
  `hotelid` int(11) DEFAULT NULL,
  `userid` int(11) DEFAULT NULL,
  `dateposted` varchar(15) DEFAULT NULL,
  `reviewtext` varchar(300) DEFAULT NULL,
  `likes` int(11) DEFAULT NULL,
  `dislikes` int(11) DEFAULT NULL,
  `rating` int(11) DEFAULT NULL,
  `parentreview` int(11) DEFAULT NULL,
  PRIMARY KEY (`reviewid`),
  KEY `userid_idx` (`userid`),
  KEY `hotelid_idx` (`hotelid`),
  CONSTRAINT `reviewshotelid` FOREIGN KEY (`hotelid`) REFERENCES `hotels` (`hotelid`) ON DELETE SET NULL ON UPDATE NO ACTION,
  CONSTRAINT `reviewsuserid` FOREIGN KEY (`userid`) REFERENCES `users` (`userid`) ON DELETE CASCADE ON UPDATE NO ACTION
) ENGINE=InnoDB AUTO_INCREMENT=9 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `reviews`
--

LOCK TABLES `reviews` WRITE;
/*!40000 ALTER TABLE `reviews` DISABLE KEYS */;
INSERT INTO `reviews` VALUES (2,1,2,'10/5/2001','I love this hotel! There\'s so much stuff to do and the staff were super friendly! I\'d definitely go here again just because of how good it was!',5097,486,5,0),(3,1,3,'10/6/2001','Terrible staff and terrible service. I would rate it one but I was homeless and they gave me complimentary breakfast by accident.',225,123,1,0),(7,1,2,'5/28/2018','This review will not work, most likely.',4,3,3,0),(8,1,2,'5/28/2018','I LOVE BITCONNECT',0,0,5,0);
/*!40000 ALTER TABLE `reviews` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `rooms`
--

DROP TABLE IF EXISTS `rooms`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `rooms` (
  `hotelid` int(11) DEFAULT NULL,
  `roomtype` varchar(30) DEFAULT NULL,
  `roomcost` varchar(30) DEFAULT NULL,
  KEY `hotelid_idx` (`hotelid`),
  CONSTRAINT `roomshotelid` FOREIGN KEY (`hotelid`) REFERENCES `hotels` (`hotelid`) ON DELETE CASCADE ON UPDATE NO ACTION
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `rooms`
--

LOCK TABLES `rooms` WRITE;
/*!40000 ALTER TABLE `rooms` DISABLE KEYS */;
/*!40000 ALTER TABLE `rooms` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `users`
--

DROP TABLE IF EXISTS `users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `users` (
  `userid` int(11) NOT NULL AUTO_INCREMENT,
  `lastname` varchar(45) DEFAULT NULL,
  `firstname` varchar(45) DEFAULT NULL,
  `email` varchar(100) DEFAULT NULL,
  `password` varchar(100) DEFAULT NULL,
  `country` varchar(30) DEFAULT NULL,
  `manager` tinyint(4) DEFAULT 0,
  PRIMARY KEY (`userid`),
  UNIQUE KEY `userid_UNIQUE` (`userid`),
  UNIQUE KEY `email_UNIQUE` (`email`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `users`
--

LOCK TABLES `users` WRITE;
/*!40000 ALTER TABLE `users` DISABLE KEYS */;
INSERT INTO `users` VALUES (1,'manager','admin','adminmanager@goprohotels.com','password','Australia',1),(2,'Daza','Raza','razadaza@gmail.com','password2','Australia',0),(3,'Mop','Bazil','bazilmop@hotmail.com','password3','Australia',0),(4,'user','admin','adminuser@goprohotels.com','password','Australia',0),(5,'Adelaide','Hilton','manager@hiltonadelaide.com.au','passwordhilton','Australia',1);
/*!40000 ALTER TABLE `users` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2018-05-28 20:06:39
