#!/usr/bin/env ruby

movie_paths = ['..', '/Volumes/DrummerDiskOSX/2016-01-31-macbook-pro-2012-backup/Downloads/Utorrent/_movies']

def find_paths paths
  paths.map do |path|
    %x[find #{path} -name "*.omdb"].split("\n").reject{ |path| path =~ /_watched/}
  end.reduce(:+)
end

omdb_paths = find_paths movie_paths

omdb_files = []

omdb_paths.each do |path|
  file = File.read(path)

  unless file.empty?
    omdb_files << file
  end
end

movies_json = omdb_files.map.with_index do |file, index|
  if index == 0
    "[" + file + ","
  elsif index == omdb_files.length - 1
    file + "]"
  else
    file + ","
  end
end

puts movies_json
File.write("app/scripts/movies.json", movies_json.reduce(:+))
