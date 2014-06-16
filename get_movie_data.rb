#!/usr/bin/env ruby

omdb_paths = %x[find .. -name "*.omdb"].split("\n").reject{ |path| path =~ /_watched/}

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
