#!/usr/bin/env ruby

find_omdb = %x[find .. -name "*.omdb"].split("\n")

ids = find_omdb.map{ |line|
  line.gsub(/^\.\.\/[^\/]*\/([^.]*)\.omdb/, '\1')
}

File.write("app/scripts/movies.json", ids.inspect)
