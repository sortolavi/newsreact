<?php
// get page contents
function PIPHP_CurlGetContents($url, $agent)
{
	$ch = curl_init();
	curl_setopt($ch, CURLOPT_URL, $url);
	curl_setopt($ch, CURLOPT_USERAGENT, $agent);
	curl_setopt($ch, CURLOPT_HEADER, 0);
	curl_setopt($ch, CURLOPT_ENCODING, "gzip");
	curl_setopt($ch, CURLOPT_RETURNTRANSFER, 1);
	curl_setopt($ch, CURLOPT_FOLLOWLOCATION, 1);
	curl_setopt($ch, CURLOPT_FAILONERROR, 1);
	curl_setopt($ch, CURLOPT_CONNECTTIMEOUT, 8);
	curl_setopt($ch, CURLOPT_TIMEOUT, 8);
	$result = curl_exec($ch);
	curl_close($ch);
	return $result;
}

date_default_timezone_set('Europe/Helsinki');

$limit = isset($_GET['limit']) ? $_GET['limit'] : 1;

$url = "https://www.ampparit.com/api/users/goofy/items/featured?limit=$limit";
$agent = 'Mozilla/5.0 (Windows; U; Windows NT 6.1; en-GB; ' . 'rv:1.9.1) Gecko/20090624 Firefox/3.5 (.NET CLR ' . '3.5.30729)';

$contents = PIPHP_CurlGetContents($url, $agent);
// $contents = utf8_encode($contents);
// echo $contents;


header("Content-Type: application/json");
echo $contents;