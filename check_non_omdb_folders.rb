#!/usr/bin/env ruby

puts "\nThese are the folders at .. that don't have an .omdb file:\n\n"

folders = %x[ls ..].split("\n")

folders.each do |folder|
  list = %x[ls ../"#{folder}"]
  if not list =~ /.*?omdb.*/
    puts folder
  end
end
