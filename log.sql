-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1:3306
-- Generation Time: Jun 10, 2024 at 02:29 PM
-- Server version: 8.2.0
-- PHP Version: 8.1.26

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `log`
--

-- --------------------------------------------------------

--
-- Table structure for table `log_status`
--

DROP TABLE IF EXISTS `log_status`;
CREATE TABLE IF NOT EXISTS `log_status` (
  `log_id` int NOT NULL AUTO_INCREMENT,
  `success` int NOT NULL,
  `failure` int NOT NULL,
  `skipped` int NOT NULL,
  `file_status` enum('fail','success') NOT NULL,
  `created_at` datetime NOT NULL,
  `vendor_name` varchar(200) NOT NULL,
  PRIMARY KEY (`log_id`)
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `log_status`
--

INSERT INTO `log_status` (`log_id`, `success`, `failure`, `skipped`, `file_status`, `created_at`, `vendor_name`) VALUES
(1, 0, 0, 63, 'success', '2024-06-10 19:32:34', 'dinky'),
(6, 0, 0, 48, 'success', '2024-06-10 19:33:23', 'vedangi');

-- --------------------------------------------------------

--
-- Table structure for table `product`
--

DROP TABLE IF EXISTS `product`;
CREATE TABLE IF NOT EXISTS `product` (
  `product_id` int NOT NULL,
  `product_name` varchar(255) NOT NULL,
  `quantity` int NOT NULL,
  `price` decimal(7,2) NOT NULL,
  PRIMARY KEY (`product_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `product`
--

INSERT INTO `product` (`product_id`, `product_name`, `quantity`, `price`) VALUES
(1, 'tea', 20, 20.00),
(2, 'tea', 20, 30.00),
(3, 'tea', 20, 20.00),
(4, 'tea', 20, 20.00),
(5, 'tea', 20, 20.00),
(6, 'tea', 20, 20.00),
(7, 'tea', 20, 20.00),
(8, 'tea', 20, 40.00),
(9, 'tea', 20, 20.00),
(10, 'tea', 20, 20.00),
(11, 'tea', 20, 20.00),
(12, 'tea', 20, 50.00),
(13, 'tea', 20, 50.00),
(14, 'tea', 20, 50.00),
(15, 'tea', 20, 20.00),
(16, 'tea', 20, 20.00),
(17, 'tea', 20, 20.00),
(18, 'tea', 20, 20.00),
(19, 'tea', 20, 20.00),
(20, 'tea', 20, 20.00),
(21, 'tea', 20, 20.00),
(22, 'tea', 20, 20.00),
(23, 'tea', 20, 20.00),
(24, 'tea', 20, 20.00),
(25, 'tea', 20, 20.00),
(26, 'tea', 20, 20.00),
(27, 'tea', 20, 20.00),
(28, 'tea', 20, 20.00),
(29, 'tea', 20, 20.00),
(30, 'tea', 20, 20.00),
(31, 'tea', 20, 20.00),
(32, 'tea', 20, 20.00),
(33, 'tea', 20, 20.00),
(34, 'tea', 20, 20.00),
(35, 'tea', 20, 20.00),
(36, 'tea', 20, 20.00),
(37, 'tea', 20, 20.00),
(38, 'tea', 20, 20.00),
(39, 'tea', 20, 20.00),
(40, 'tea', 20, 20.00),
(41, 'tea', 20, 20.00),
(42, 'tea', 20, 20.00),
(43, 'tea', 20, 20.00),
(44, 'tea', 20, 20.00),
(45, 'tea', 20, 20.00),
(46, 'tea', 20, 20.00),
(47, 'tea', 20, 20.00),
(48, 'tea', 20, 20.00),
(49, 'tea', 20, 20.00),
(50, 'tea', 20, 20.00),
(51, 'tea', 20, 20.00),
(52, 'tea', 20, 20.00),
(53, 'tea', 20, 20.00),
(54, 'tea', 20, 20.00),
(55, 'tea', 20, 20.00),
(56, 'tea', 20, 20.00),
(57, 'tea', 20, 20.00),
(58, 'tea', 20, 20.00),
(59, 'tea', 20, 30.00),
(60, 'tea', 20, 20.00),
(61, 'tea', 30, 20.00),
(62, 'tea', 30, 20.00),
(63, 'tea', 40, 30.00),
(101, 'coffee', 20, 20.00),
(102, 'coffee', 20, 20.00),
(103, 'coffee', 20, 20.00),
(104, 'coffee', 20, 20.00),
(105, 'coffee', 20, 20.00),
(106, 'coffee', 20, 20.00),
(107, 'coffee', 20, 20.00),
(108, 'coffee', 20, 20.00),
(109, 'coffee', 20, 20.00),
(110, 'coffee', 20, 20.00),
(111, 'coffee', 20, 20.00),
(112, 'coffee', 20, 20.00),
(113, 'coffee', 20, 20.00),
(114, 'coffee', 20, 20.00),
(115, 'coffee', 20, 20.00),
(116, 'coffee', 20, 20.00),
(117, 'coffee', 20, 20.00),
(118, 'coffee', 20, 20.00),
(119, 'coffee', 20, 20.00),
(120, 'coffee', 20, 20.00),
(121, 'coffee', 20, 20.00),
(122, 'coffee', 20, 20.00),
(123, 'coffee', 20, 20.00),
(124, 'coffee', 20, 20.00),
(125, 'coffee', 20, 20.00),
(126, 'coffee', 20, 20.00),
(127, 'coffee', 20, 20.00),
(128, 'coffee', 20, 20.00),
(129, 'coffee', 20, 20.00),
(130, 'coffee', 20, 20.00),
(131, 'coffee', 20, 20.00),
(132, 'coffee', 20, 20.00),
(133, 'coffee', 20, 20.00),
(134, 'coffee', 20, 20.00),
(135, 'coffee', 20, 20.00),
(136, 'coffee', 20, 20.00),
(137, 'coffee', 20, 20.00),
(138, 'coffee', 20, 20.00),
(139, 'coffee', 20, 20.00),
(140, 'coffee', 20, 20.00),
(141, 'coffee', 20, 20.00),
(142, 'coffee', 20, 40.00),
(143, 'coffee', 20, 20.00),
(144, 'coffee', 20, 20.00),
(145, 'coffee', 20, 20.00),
(146, 'coffee', 20, 20.00),
(147, 'coffee', 20, 20.00),
(148, 'coffee', 20, 20.00),
(151, 'coffee', 20, 60.00);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
