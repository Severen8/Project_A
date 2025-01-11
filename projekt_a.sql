-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Sty 03, 2025 at 12:26 PM
-- Wersja serwera: 10.4.32-MariaDB
-- Wersja PHP: 8.2.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `projekt_a`
--

-- --------------------------------------------------------

--
-- Struktura tabeli dla tabeli `cecha`
--

CREATE TABLE `cecha` (
  `id` int(11) NOT NULL,
  `nazwa` varchar(255) NOT NULL,
  `opis` text DEFAULT NULL,
  `modyfikator` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_bin DEFAULT NULL CHECK (json_valid(`modyfikator`))
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Struktura tabeli dla tabeli `cechapostaci`
--

CREATE TABLE `cechapostaci` (
  `id` int(11) NOT NULL,
  `idPostaci` int(11) NOT NULL,
  `idCechy` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Struktura tabeli dla tabeli `chatwpis`
--

CREATE TABLE `chatwpis` (
  `id` int(11) NOT NULL,
  `idKampani` int(11) NOT NULL,
  `czas` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  `idUzytkownika` int(11) NOT NULL,
  `tresc` text NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Struktura tabeli dla tabeli `kampania`
--

CREATE TABLE `kampania` (
  `id` int(11) NOT NULL,
  `idMG` int(11) NOT NULL,
  `nazwa` varchar(255) NOT NULL,
  `opis` text DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Struktura tabeli dla tabeli `postać`
--

CREATE TABLE `postać` (
  `id` int(11) NOT NULL,
  `idGracza` int(11) NOT NULL,
  `idKampanii` int(11) NOT NULL,
  `nazwa` varchar(255) NOT NULL,
  `staty` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_bin DEFAULT NULL CHECK (json_valid(`staty`)),
  `opis` text DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Struktura tabeli dla tabeli `przedmiot`
--

CREATE TABLE `przedmiot` (
  `id` int(11) NOT NULL,
  `typ` varchar(50) NOT NULL,
  `nazwa` varchar(255) NOT NULL,
  `opis` text DEFAULT NULL,
  `staty` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_bin DEFAULT NULL CHECK (json_valid(`staty`))
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Struktura tabeli dla tabeli `przedmiotypostaci`
--

CREATE TABLE `przedmiotypostaci` (
  `id` int(11) NOT NULL,
  `idPostaci` int(11) NOT NULL,
  `idPrzedmiotu` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Struktura tabeli dla tabeli `uzytkownicy`
--

CREATE TABLE `uzytkownicy` (
  `id` int(11) NOT NULL,
  `nazwa` varchar(255) NOT NULL,
  `typ` varchar(50) NOT NULL,
  `email` varchar(255) NOT NULL,
  `haslo` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Indeksy dla zrzutów tabel
--

--
-- Indeksy dla tabeli `cecha`
--
ALTER TABLE `cecha`
  ADD PRIMARY KEY (`id`);

--
-- Indeksy dla tabeli `cechapostaci`
--
ALTER TABLE `cechapostaci`
  ADD PRIMARY KEY (`id`),
  ADD KEY `idPostaci` (`idPostaci`),
  ADD KEY `idCechy` (`idCechy`);

--
-- Indeksy dla tabeli `chatwpis`
--
ALTER TABLE `chatwpis`
  ADD PRIMARY KEY (`id`),
  ADD KEY `idUzytkownika` (`idUzytkownika`),
  ADD KEY `idKampani` (`idKampani`);

--
-- Indeksy dla tabeli `kampania`
--
ALTER TABLE `kampania`
  ADD PRIMARY KEY (`id`),
  ADD KEY `idMG` (`idMG`);

--
-- Indeksy dla tabeli `postać`
--
ALTER TABLE `postać`
  ADD PRIMARY KEY (`id`),
  ADD KEY `idGracza` (`idGracza`),
  ADD KEY `idKampanii` (`idKampanii`);

--
-- Indeksy dla tabeli `przedmiot`
--
ALTER TABLE `przedmiot`
  ADD PRIMARY KEY (`id`);

--
-- Indeksy dla tabeli `przedmiotypostaci`
--
ALTER TABLE `przedmiotypostaci`
  ADD PRIMARY KEY (`id`),
  ADD KEY `idPostaci` (`idPostaci`),
  ADD KEY `idPrzedmiotu` (`idPrzedmiotu`);

--
-- Indeksy dla tabeli `uzytkownicy`
--
ALTER TABLE `uzytkownicy`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `email` (`email`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `cecha`
--
ALTER TABLE `cecha`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `cechapostaci`
--
ALTER TABLE `cechapostaci`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `chatwpis`
--
ALTER TABLE `chatwpis`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `kampania`
--
ALTER TABLE `kampania`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `postać`
--
ALTER TABLE `postać`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `przedmiot`
--
ALTER TABLE `przedmiot`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `przedmiotypostaci`
--
ALTER TABLE `przedmiotypostaci`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `uzytkownicy`
--
ALTER TABLE `uzytkownicy`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `cechapostaci`
--
ALTER TABLE `cechapostaci`
  ADD CONSTRAINT `cechapostaci_ibfk_1` FOREIGN KEY (`idPostaci`) REFERENCES `postać` (`id`),
  ADD CONSTRAINT `cechapostaci_ibfk_2` FOREIGN KEY (`idCechy`) REFERENCES `cecha` (`id`);

--
-- Constraints for table `chatwpis`
--
ALTER TABLE `chatwpis`
  ADD CONSTRAINT `chatwpis_ibfk_1` FOREIGN KEY (`idUzytkownika`) REFERENCES `uzytkownicy` (`id`),
  ADD CONSTRAINT `chatwpis_ibfk_2` FOREIGN KEY (`idKampani`) REFERENCES `kampania` (`id`);

--
-- Constraints for table `kampania`
--
ALTER TABLE `kampania`
  ADD CONSTRAINT `kampania_ibfk_1` FOREIGN KEY (`idMG`) REFERENCES `uzytkownicy` (`id`);

--
-- Constraints for table `postać`
--
ALTER TABLE `postać`
  ADD CONSTRAINT `postać_ibfk_1` FOREIGN KEY (`idGracza`) REFERENCES `uzytkownicy` (`id`),
  ADD CONSTRAINT `postać_ibfk_2` FOREIGN KEY (`idKampanii`) REFERENCES `kampania` (`id`);

--
-- Constraints for table `przedmiotypostaci`
--
ALTER TABLE `przedmiotypostaci`
  ADD CONSTRAINT `przedmiotypostaci_ibfk_1` FOREIGN KEY (`idPostaci`) REFERENCES `uzytkownicy` (`id`),
  ADD CONSTRAINT `przedmiotypostaci_ibfk_2` FOREIGN KEY (`idPrzedmiotu`) REFERENCES `przedmiot` (`id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
