<?php

namespace Memory\Helper;

final class TimeHelper
{
    /**
     * Retourne le temps sous format :
     * 0h20m18s et 155 millièmes
     *
     * @param $milliseconds integer
     * @return string
     */
    public static function formatMilliseconds($milliseconds)
    {
        $seconds = floor($milliseconds / 1000);
        $minutes = floor($seconds / 60);
        $hours = floor($minutes / 60);
        $milliseconds = $milliseconds % 1000;
        $seconds = $seconds % 60;
        $minutes = $minutes % 60;

        $format = '%uh%02um%02us et %03u millièmes';
        $time = sprintf($format, $hours, $minutes, $seconds, $milliseconds);
        return rtrim($time, '0');
    }
}