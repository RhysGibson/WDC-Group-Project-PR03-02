-- MySQL dump 10.16  Distrib 10.2.15-MariaDB, for Win64 (AMD64)
--
-- Host: localhost    Database: hotelsite
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
  `datein` varchar(15) DEFAULT NULL,
  `dateout` varchar(15) DEFAULT NULL,
  `roomnum` int(11) DEFAULT NULL,
  `imagefile` varchar(100) DEFAULT NULL,
  `cost` int(11) DEFAULT NULL,
  `paymentfulfilled` tinyint(4) DEFAULT 1,
  `numpeople` int(11) DEFAULT NULL,
  PRIMARY KEY (`bookingid`),
  KEY `hotelid_idx` (`hotelid`),
  KEY `userid_idx` (`userid`),
  CONSTRAINT `bookingshotelid` FOREIGN KEY (`hotelid`) REFERENCES `hotels` (`hotelid`) ON DELETE CASCADE ON UPDATE NO ACTION,
  CONSTRAINT `bookingsuserid` FOREIGN KEY (`userid`) REFERENCES `users` (`userID`) ON DELETE CASCADE ON UPDATE NO ACTION
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `bookings`
--

LOCK TABLES `bookings` WRITE;
/*!40000 ALTER TABLE `bookings` DISABLE KEYS */;
INSERT INTO `bookings` VALUES (3,2,1,'5/29/2018','6/2/2018',5,'/images/room1.jpg',500,1,1);
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
  CONSTRAINT `userid` FOREIGN KEY (`userid`) REFERENCES `users` (`userID`) ON DELETE SET NULL ON UPDATE NO ACTION
) ENGINE=InnoDB AUTO_INCREMENT=33 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `hotels`
--

LOCK TABLES `hotels` WRITE;
/*!40000 ALTER TABLE `hotels` DISABLE KEYS */;
INSERT INTO `hotels` VALUES (1,5,'Hilton Adelaide','The Hilton Hotel is located in a central location within Adelaide.','Hilton is a global brand founded by Conrad Hilton. The Hilton Adelaide is one of Adelaide\'s finest hotels. It\'s central location in the CBD allows you to commute around the city easily, letting you make the most of your time in Adelaide. Whether you\'re looking for a good time in the city or just a nice play to stay for a while, the Hilton Adelaide has you covered. Our staff will be sure to take care of any of your needs to the best of our ability to leave you with a satisfied experience.',500,'Free Wifi and Complimentary Breakfast Everyday.',-34.929143,138.5989062,5,5),(3,1,'Chifley on South Terrace','Modern hotel opposite the Adelaide Park Lands.','Chifley on South Terrace is situated across form the Adelaide Park Lands, and is within walking distance from the tram. With wonderful views of the Park Lands, this hotel is for those who want to be in the CBD but don\'t want to be surrounded by buildings. Our Friendly staff will take care of you to the best of their abilities.',150,'Free Wifi.',-34.935305,138.605599,4,3),(4,1,'Hostel 109 Flashpackers','Relaxed Hostel offering low-key rooms.','Set just 6 minutes walk away from the tram, this hostel is set a bus trip away from Morialta Conservation Park or Mount Lofty. With bright 4-bed dorms, and private rooms, this budget hostel is perfect for any backpacker wanting to experience Adelaide.',100,'Free Wifi.',-34.931525,138.604243,5,4),(5,1,'Adabco Boutique Hotel','Upmarket Rooms and Suites.','Set in a Venetian Gothic-style building on a tree lined street, this hotel is a 15 minute walk from Rundle Mall. With Modern rooms, and flat-screen TVs, this is perfect for anyone wanting to escape the noise of the central CBD.',250,'Free Wifi and Free Breakfast.',-34.928564,138.60904,4,4),(6,1,'Backpack Oz','Budget Accomodation.','Housed in a building from 1854, this Hotel is a 12 minute walk from the Adelaide Central Markets and Rundle Mall. Both rooms and dorms have shared bathrooms and either metal framed beds or bunks. If you\'re looking to stay in the CBD on a budget, we are the place for you.',100,'Free Wifi.',-34.928077,138.606298,5,3),(7,1,'Adina Apartment Hotel Adelaide Treasury','Set in Adelaide\'s former treasury building.','This polished hotel is a mere 8 minute walk from Rundle Mall. With the walls around you flowing with History, this hotel in a building from 1839 is sure to be the best choice in the city.',200,'Free Wifi.',-34.926994,138.600374,4,4),(8,1,'Franklin Central Apartments','Casual, redbrick lodging.','Set right in the CBD, this relaxed all-apartment hotel is 1.8km from Rundle Mall. With relaxed apartments, this hotel is perfect to just escape to.',250,'Air-Conditioned.',-34.926827,138.597567,4,4),(9,1,'iStay Precinct','Modern Apartments set in an industrial-chic building.','Set in the CBD, these modern apartments are only a 10 minute walk from the Central Markets. With contemporary apartments offering city views, this hotel is ideal for those who want a different hotel experience.',200,'Air-Conditioned.',-34.926903,138.593387,4,4),(10,1,'Hotel Richmond','A hotel located on Rundle Mall. Provides easy access to shopping.','Situated on Rundle Mall, this vintage hotel is set in a 19th Century building. With the Museum and Art Gallery only a 4 minute walk away this is perfect for families to stay at.',350,'Free Wifi.',-34.922488,138.604227,5,4),(11,1,'The Chancellor on Currie','Set in the Central Business District with a 5 minute walk from Rundle Mall.','Situated right near Rundle Mall, this Neo-Georgian style building is set in the CBD. With Traditional Rooms and suites, this hotel is ideal for many people to stay at.',200,'Free Wifi.',-34.924171,138.598826,4,4),(12,1,'Adelaide Rockford','A 2 minute walk from the City West tram stop, this hotel is only 1.5km from Adelaide Oval.','With bright , relaxed rooms in this hotel are perfect to return to after a night out on the town. Set right near some of the most popular nightclubs in the CBD, this hotel is perfect for party animals.',350,'Free Wifi and an Indoor and Outdoor Pool.',-34.923095,138.592895,5,3),(13,1,'Hotel Grand Chancellor Adelaide','A hotel with many fine qualities such as a central location and access to public transport.','Set on the lively Hindley Street, this refined hotel is a 3 minute walk from the Adelaide Railway Station. With warm, casual rooms with city views, the hotel and its staff are top quality.',300,'Free Wifi.',-34.923553,138.596947,5,4),(14,1,'Adelaide Paringa Motel','Set in a 1926 building with an Edwardian facade. This modern motel is 1km from the Central Markets, and 1.8km from the Botanic Gardens. The basic rooms feature rustic wooden accents, and is perfect for anyone going away for a few nights.','250',0,'-34.923121',138.598758,3,3,NULL),(15,1,'Miller Apartments','Situated near the city centre, easy walking distance to Rundle Mall.','Set near the city centre, this hotel is a top rated hotel within easy walking distance of Rundle Mall. With luxurious rooms and a short walk from public transport, this hotel is a top pick to stay at.',250,'Free Wifi.',-34.922697,138.598186,5,4),(16,1,'Stamford Plaza Adelaide','Set in a bustling area in Adelaide\'s city centre, this upscale hotel is a minute walk from the Adelaide Casino.','This upscale hotel is set on the City\'s North Terrace, right across from the Adelaide Railway Station. Modern rooms and suites are featured here, with free high-speed internet, making this perfect for business travellers.',300,'Free Wifi.',-34.921889,138.59853,5,4),(17,1,'InterContinental Adelaide','Relaxed rooms and Suites in an elegant hotel featuring an outdoor pool, 3 restaurants, and a gym.','As part of the InterContinental Brand, this is one of Adelaide\'s fanciest hotels. Set right near the Adelaide Railway Station, the relaxed rooms are luxurious with city or river views.',450,'Free Wifi and unlimited pool access.',-34.920679,138.596511,5,5),(18,1,'Mercure Grosvenor Adelaide','Modern rooms in a contemporary lodging 1 minute away from a tram stop and the Railway Station.','Featuring neoclassical columns and balustrades, this modern hotel in an elegant building makes you feel a bit special. Contemporary rooms with upgradable benefits allow you to truly feel like you\'re living like royalty.',300,'Gym and Restaurant.',-34.922183,138.596575,4,3),(19,1,'The Playford Hotel','Elegant rooms and suites situated within a 4 minute walk from the Adelaide Railway Station and the Adelaide Casino.','A very elegant upscale hotel set on North Terrace, this hotel makes you feel like you\'re away in Europe. With a bar with opulent chandeliers and a 24-hour health club, this hotel treats you like royalty.',400,'Free Wifi and an Indoor Pool.',-34.922199,138.596195,5,5),(20,1,'Oaks Horizons','Bright apartments with kitchens and laundry facilities.','Set in the CBD, this all apartment hotel is 3 minutes walk from the Adelaide Railway Station. With bright apartments with modern furnishings, and city views from any apartment, this makes you feel like you live in the CBD.',300,'Gym and Sauna.',-34.922096,138.595175,5,4),(21,1,'Oaks Embassy','Set across from the Adelaide Convention Centre in a bustling area with theatres and restaurants.','This hip and modern apartment building is 1.9km from the Adelaide Botanic Gardens and 2.3km from the Adelaide Zoo. With plush apartments with kitchens and laundry appliances, these apartments are truly your home away from home.',350,'Indoor and Outdoor Pool.',-34.921997,138.5946,4,4);
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
  CONSTRAINT `reviewsuserid` FOREIGN KEY (`userid`) REFERENCES `users` (`userID`) ON DELETE CASCADE ON UPDATE NO ACTION
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
) ENGINE=InnoDB AUTO_INCREMENT=15 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `users`
--

LOCK TABLES `users` WRITE;
/*!40000 ALTER TABLE `users` DISABLE KEYS */;
INSERT INTO `users` VALUES (1,'manager','admin','adminmanager@goprohotels.com','password','AU',1),(2,'Daza','Raza','razadaza@gmail.com','password2','AU',0),(3,'Mop','Bazil','bazilmop@hotmail.com','password3','AU',0),(4,'user','admin','adminuser@goprohotels.com','password','AU',0),(5,'Adelaide','Hilton','manager@hiltonadelaide.com.au','passwordhilton','AU',1),(6,'John','John','ohno@what.com','password1','BD',0),(7,'Jose','No Thanks','notanemail@gmail.com','thisisapassword','BD',0),(8,'Josen','No Thanks','notan1email@gmail.com','yes','BD',1),(9,'Nosay','Mohay','ohhoho@gmail.com','notapassword','AI',1),(10,'Nosay','Mohay','ohhoho2@gmail.com','No','BS',1),(11,'Me','Sign','signmeup@hotmail.com','up','AU',1),(12,'Up','Signing','Brotel@broseph.com','Works','BH',1),(13,'Up','Signing','Brotel@bros2eph.com','1231','AU',1),(14,'Up','Signing','test@test1.com','Again','AU',1);
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

-- Dump completed on 2018-05-29 13:35:34
