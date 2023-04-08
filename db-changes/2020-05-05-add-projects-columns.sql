ALTER TABLE `prod_blue-shop`.`projects`
ADD COLUMN `code` varchar(255) NULL AFTER `address`,
ADD COLUMN `market_segment` varchar(255) NULL AFTER `code`,
ADD COLUMN `pricing_margin` varchar(255) NULL AFTER `market_segment`,
ADD COLUMN `estimated_start_date` bigint(20) NULL AFTER `pricing_margin`;
