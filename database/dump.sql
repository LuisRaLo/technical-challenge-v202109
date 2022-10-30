CREATE DATABASE  IF NOT EXISTS `lerl_challenge` /*!40100 DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci */ /*!80016 DEFAULT ENCRYPTION='N' */;
USE `lerl_challenge`;
-- MySQL dump 10.13  Distrib 8.0.31, for Win64 (x86_64)
--
-- Host: 127.0.0.1    Database: lerl_challenge
-- ------------------------------------------------------
-- Server version	8.0.30

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `personas`
--

DROP TABLE IF EXISTS `personas`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `personas` (
  `persona_id` int NOT NULL AUTO_INCREMENT,
  `telefono` varchar(50) NOT NULL,
  `nombre` varchar(255) NOT NULL,
  `apaterno` varchar(255) NOT NULL,
  `amaterno` varchar(255) NOT NULL,
  `fecha_nacimiento` varchar(50) NOT NULL,
  `genero` varchar(50) NOT NULL,
  PRIMARY KEY (`persona_id`)
) ENGINE=InnoDB AUTO_INCREMENT=117 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `personas`
--

LOCK TABLES `personas` WRITE;
/*!40000 ALTER TABLE `personas` DISABLE KEYS */;
INSERT INTO `personas` VALUES (92,'9995148922','Luis','Ramírez','López','1994-12-12','M'),(93,'9995148922','Luis','Ramírez','López','1994-12-12','M'),(94,'9995148922','Luis','Ramírez','López','1994-12-12','M'),(95,'9995148922','Luis','Ramírez','López','1994-12-12','M'),(96,'9995148922','Luis','Ramírez','López','1994-12-12','M'),(97,'9995148922','Luis3','Ramírez','López','1994-12-12','M'),(98,'9995148922','Luis4','Ramírez','López','1994-12-12','M'),(99,'9995148922','Luis4','Ramírez','López','1994-12-12','M'),(100,'9995148922','Luis4','Ramírez','López','1994-12-12','M'),(101,'9995148922','Luis4','Ramírez','López','1994-12-12','M'),(102,'9995148922','Luis4','Ramírez','López','1994-12-12','M'),(103,'555555555','Usuario','test','uno','555456456','M'),(104,'123456','sdf','f','f','sdf','M'),(105,'12312312','sdf','sdf','sdf','sdf','M'),(106,'12312312','sdf','sdf','sdf','sdf','M'),(107,'123234','User','test','tres','12/12/94','M'),(108,'563465','usurio','test','cinco','12/12/1994','M'),(109,'654596','usuario','test','seis','12/12/1994','M'),(110,'654596','usuario','test','seis','12/12/1994','M'),(111,'654596','usuario','test','seis','12/12/1994','M'),(112,'654596','usuario','test','seis','12/12/1994','M'),(113,'654596','usuario','test','seis','12/12/1994','M'),(114,'654596','usuario','test','seis','12/12/1994','M'),(115,'654596','usuario','test','seis','12/12/1994','M'),(116,'45456','usuario','test','trece','12/12/1994','M');
/*!40000 ALTER TABLE `personas` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `usuarios`
--

DROP TABLE IF EXISTS `usuarios`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `usuarios` (
  `usuario_id` int NOT NULL AUTO_INCREMENT,
  `persona_id` int DEFAULT NULL,
  `rol` varchar(20) NOT NULL,
  `email` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  `token` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci DEFAULT NULL,
  `token_recovery` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci DEFAULT NULL,
  `isActive` int NOT NULL DEFAULT '1',
  `acceptTerms` tinyint DEFAULT '0',
  `acceptPrivacy` tinyint DEFAULT '0',
  `acceptNewsletters` tinyint DEFAULT '0',
  `createdAt` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updateAt` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `deleteAt` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`usuario_id`),
  UNIQUE KEY `persona_id_UNIQUE` (`persona_id`),
  KEY `FK_usuarios_personas` (`persona_id`),
  CONSTRAINT `FK_usuarios_personas` FOREIGN KEY (`persona_id`) REFERENCES `personas` (`persona_id`)
) ENGINE=InnoDB AUTO_INCREMENT=24 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `usuarios`
--

LOCK TABLES `usuarios` WRITE;
/*!40000 ALTER TABLE `usuarios` DISABLE KEYS */;
INSERT INTO `usuarios` VALUES (1,92,'ADMINISTRATOR','luian.ramirez.12@gmail.com','$2b$12$sAuvrobaASh7nviAnL7/P.9./3wbyIB1pO97G0rzQiX0gwJbTNkaG','eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiZW1haWwiOiJsdWlhbi5yYW1pcmV6LjEyQGdtYWlsLmNvbSIsInBlcnNvbmFfaWQiOjkyLCJleHAiOjE2NjcxMTA5OTAuMzcxNDcyfQ.Kjj8jNtMX6o23baTlaEEk-H1mJBqxoqB7uL6ty-kNRg',NULL,1,0,0,0,'2022-10-27 05:11:41','2022-10-29 06:23:10',NULL),(2,93,'ADMINISTRATOR','luian.ramirez.12@gmail.com','$2b$12$h6BmsnCZUjokjFrwYtxdH.wlzANM4X.7tpBv/u1lEpXfrBFoCPvcm',NULL,NULL,1,0,0,0,'2022-10-27 06:07:22','2022-10-29 04:44:13',NULL),(3,94,'ADMINISTRATOR','luian.ramirez.12@gmail.com','$2b$12$NwR9Z.JAzSuydeYuabbqquZwEPxXnQ5PJGqKC5dHifTVIYauj4USC',NULL,NULL,1,0,0,0,'2022-10-27 06:07:24','2022-10-29 04:44:13',NULL),(4,95,'ADMINISTRATOR','luian.ramirez.12@gmail.com','$2b$12$LUKYp.DUH67bYgGXRxfjNeWSpRq3CB/rZTqdBXKxePUanRswjDOQC',NULL,NULL,1,0,0,0,'2022-10-27 06:12:44','2022-10-29 04:44:13',NULL),(5,96,'USER','usuario2@gmail.com','$2b$12$fW7BK4aPDc/LXV6x1Wl2FOEBSjbwj5PRbe2NmH0ET078cUbz7gxN6','b\'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6NSwiZW1haWwiOiJ1c3VhcmlvMkBnbWFpbC5jb20iLCJwZXJzb25hX2lkIjo5NiwiZXhwIjoxNjY3MDA3NTY2Ljk4NzY4OH0._udvjOUKYa9ky2yRGRSqLwToEcYrvPkH-yD_LQBMKuY\'',NULL,1,0,0,0,'2022-10-27 07:20:50','2022-10-29 04:44:13',NULL),(6,97,'USER','usuario3@gmail.com','$2b$12$KFlWnh2kuPiQT/NhKfvdKOn1y43azsL6wDFgMjQuzDfafr7xy2wCm',NULL,NULL,1,0,0,0,'2022-10-27 07:21:32','2022-10-29 04:44:13',NULL),(9,102,'USER','usuario4@gmail.com','$2b$12$UmYOGH.iDqNumpncQBTDD.BZ0ThByzJce66omAwShaAE4PT.Ktpp.',NULL,NULL,1,0,0,0,'2022-10-27 07:42:39','2022-10-29 04:44:13',NULL),(10,103,'USER','lunymasterflow@hotmail.com','$2b$12$cpARCYMi24K5ydnOp1zUFOrZ3Et5zGvDakh.XdfAps.VldV2DGrOK',NULL,NULL,1,1,1,1,'2022-10-29 18:44:28','2022-10-30 15:20:45',NULL),(11,104,'USER','usuario@mail.com','$2b$12$wEB4jJLmMqptZDFf/g6JiuWjBfo9E7JQzadKs1L3cfsO3WoyvbD.K',NULL,NULL,1,1,1,1,'2022-10-29 18:50:57','2022-10-29 18:50:57',NULL),(12,105,'USER','usuario1@mail.com','$2b$12$hqzl8FxIJ7oTqehguqyHL.TDuLt9NmVqtpzpPVkMTBoZk5LEyrLg6',NULL,NULL,1,1,1,1,'2022-10-29 18:53:11','2022-10-29 18:53:11',NULL),(13,106,'USER','usuario2@mail.com','$2b$12$P.K7.u3djBomwcGsoCPREe/mF3ORsSI7nVMZliByhnDTLJyivCcPe',NULL,NULL,1,1,1,1,'2022-10-29 18:54:59','2022-10-29 18:54:59',NULL),(14,107,'USER','user4@mail.com','$2b$12$caJkbiYCdvwui3lc/2ag6upAXRCY1.5slTWH7oz2X2Daa07dsPmwW',NULL,NULL,1,1,1,1,'2022-10-29 18:55:43','2022-10-29 18:55:43',NULL),(15,108,'USER','usuario5','$2b$12$L6LFrOruCJ01OEzodJlogeBmtp1tc77L.ivbh64AIMBeG0kvYKqZ.',NULL,NULL,1,1,1,1,'2022-10-29 19:11:02','2022-10-29 19:11:02',NULL),(16,109,'USER','usuario6@mail.com','$2b$12$XR3bgrH7fvLNjSBgLZnTCuSxAmlItDVFLYm/A8kEPePm7Clc/7jv2',NULL,NULL,1,1,1,1,'2022-10-29 19:14:06','2022-10-29 19:14:06',NULL),(17,110,'USER','usuario7@mail.com','$2b$12$GBi6J/bXcMWucLlL7Jw.oOoQ6Be1Bn9xH5Q5cLa0QfwS1g6vjIk6O',NULL,NULL,1,1,1,1,'2022-10-29 19:16:19','2022-10-29 19:16:19',NULL),(18,111,'USER','usuario8@mail.com','$2b$12$YpFIs.QBKN/xsHeEG6bMjO3DQMWAWlWD.jaaDp6fMKla2Xz.LXbMC',NULL,NULL,1,1,1,1,'2022-10-29 19:17:31','2022-10-29 19:17:31',NULL),(19,112,'USER','usuario9@mail.com','$2b$12$unKsQOnGlPYNMqDiDr2.vOv7qe2oqHHroqY/GiqekEzx.87i5YUXS',NULL,NULL,1,1,1,1,'2022-10-29 19:17:38','2022-10-29 19:17:38',NULL),(20,113,'USER','usuario10@mail.com','$2b$12$ONfCyXg55F2iRZrEWXIu0ePb19mphdvMMhF/bXaxAhwTAU3Qo83k6',NULL,NULL,1,1,1,0,'2022-10-29 19:19:07','2022-10-29 23:27:02',NULL),(21,114,'USER','usuario11@mail.com','$2b$12$BpT.ZX4AVGG7bYHz6CjdUuKgxO7cnNVgDyUYDUArmvjgV0zRgbvb2',NULL,NULL,1,1,1,0,'2022-10-29 19:24:00','2022-10-29 23:27:02',NULL),(22,115,'USER','usuario12@mail.com','$2b$12$AdamkNjFtqJm6fSkXEITK..NZ0atPUEgbh61nXsahbfhEASL8xTf6',NULL,NULL,1,1,1,0,'2022-10-29 19:25:13','2022-10-29 23:27:02',NULL),(23,116,'USER','usuario13@mail.com','$2b$12$ZaTebS078SW48L3nAi6uOepJz9ITYh7upw1WRkSWJp2vOu1CmnJNi',NULL,NULL,1,1,1,0,'2022-10-29 19:27:09','2022-10-29 23:27:02',NULL);
/*!40000 ALTER TABLE `usuarios` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2022-10-30 16:01:26
