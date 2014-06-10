#!/usr/bin/env ruby

find_omdb = %x[find .. -name "*.omdb"].split("\n")
find_omdb_watched = %x[find ../_watched -name "*.omdb"].split("\n")

def get_id_array(find_result)
  find_result.map{ |line|
    line.gsub(/^\.\.\/(_watched\/)?[^\/]*\/([^.]*)\.omdb/, '\2')
  }
end

unwatched_movies = get_id_array(find_omdb) - get_id_array(find_omdb_watched)

File.write("app/scripts/movies.json", unwatched_movies)
