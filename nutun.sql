-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Dec 18, 2024 at 05:26 PM
-- Server version: 10.4.32-MariaDB
-- PHP Version: 8.2.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `nutun`
--

-- --------------------------------------------------------

--
-- Table structure for table `credentials`
--

CREATE TABLE `credentials` (
  `id` int(11) NOT NULL,
  `key_name` varchar(255) NOT NULL,
  `key_value` text NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `credentials`
--

INSERT INTO `credentials` (`id`, `key_name`, `key_value`, `created_at`, `updated_at`) VALUES
(1, 'MAPBOX_ACCESS_TOKEN', 'pk.eyJ1IjoiaGxhd3VsYW5pIiwiYSI6ImNtNHRvOWxvcDBiejYyanNheGVybDM2bTAifQ.6CCOlOepB6atvfb_xOACOQ', '2024-12-18 15:41:38', '2024-12-18 15:41:38'),
(2, 'OPENWEATHER_API_KEY', '75bf476488543675744e867f7a6ce7c7', '2024-12-18 15:41:38', '2024-12-18 15:41:38');

-- --------------------------------------------------------

--
-- Table structure for table `weather`
--

CREATE TABLE `weather` (
  `id` int(11) NOT NULL,
  `longitude` float NOT NULL,
  `latitude` float NOT NULL,
  `address` varchar(255) NOT NULL,
  `rain` float DEFAULT 0,
  `sun` float DEFAULT NULL,
  `humidity` float DEFAULT NULL,
  `min_temp` float DEFAULT NULL,
  `max_temp` float DEFAULT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `weather`
--

INSERT INTO `weather` (`id`, `longitude`, `latitude`, `address`, `rain`, `sun`, `humidity`, `min_temp`, `max_temp`, `created_at`) VALUES
(9, 30.5241, 50.45, 'dsfdfds', NULL, 49, 74, 273.09, 277.23, '2024-12-18 12:00:30'),
(10, -74.1207, 40.6368, 'dsfdfds', 6.87, 71, 69, 277.99, 282.5, '2024-12-18 12:03:13'),
(11, -50.746, -20.5235, 'dsfdfds', NULL, 97, 53, 22.44, 34.41, '2024-12-18 12:09:24'),
(12, -76.758, 37.9585, 'dsfdfds', 4.76, 54, 77, 6.32, 17.77, '2024-12-18 12:56:06'),
(13, 25.9169, -24.6576, 'dsfdfds', 0.5, 3, 30, 21.41, 34.92, '2024-12-18 12:57:33'),
(14, 18.86, -33.9381, 'stellenboch', NULL, 99, 37, 12.05, 24.38, '2024-12-18 13:00:02'),
(15, -79.3836, 43.6479, 'toronto', NULL, 0, 87, 1.4, 3.84, '2024-12-18 15:19:09');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `credentials`
--
ALTER TABLE `credentials`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `weather`
--
ALTER TABLE `weather`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `credentials`
--
ALTER TABLE `credentials`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT for table `weather`
--
ALTER TABLE `weather`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=16;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
