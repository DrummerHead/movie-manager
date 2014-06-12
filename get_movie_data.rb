#!/usr/bin/env ruby

omdb_paths = %x[find .. -name "*.omdb"].split("\n").reject{ |path| path =~ /_watched/}

movies_json = omdb_paths.map.with_index do |path, index|
  file = File.read(path)

  if index == 0
    "[" + file + ","
  elsif index == omdb_paths.length - 1
    file + "]"
  else
    file + ","
  end
end

File.write("app/scripts/movies.json", movies_json.reduce(:+))
