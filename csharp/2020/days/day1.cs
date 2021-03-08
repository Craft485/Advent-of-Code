using System;
using System.IO;

namespace Advent_of_Code.Y2020 {
    class Day1 {
        static void Main(string[] args) {
            string[] lines = File.ReadAllLines(@"../inputs/day1.txt");
            Part1(lines);
            Part2(lines);
        }
        static void Part1(string[] lines) {
            // Match every element to every other element
            for (int i = 0; i < lines.Length; i++) {
                for (int j = 0; j < lines.Length; j++) {
                    if (Convert.ToInt32(lines[i]) + Convert.ToInt32(lines[j]) == 2020) {
                        Console.WriteLine($"{lines[i]} + {lines[j]} = 2020\nIndices: {i}, {j}\nProduct: {Convert.ToInt32(lines[i]) * Convert.ToInt32(lines[j])}");
                        return;
                    }
                }
            }
        }
        static void Part2(string[] lines) {
            // Match every element to every other element
            for (int i = 0; i < lines.Length; i++) {
                for (int j = 0; j < lines.Length; j++) {
                    for (int k = 0; k < lines.Length; k++) {
                        if (Convert.ToInt32(lines[i]) + Convert.ToInt32(lines[j]) + Convert.ToInt32(lines[k]) == 2020) {
                            Console.WriteLine($"{lines[i]} + {lines[j]} + {lines[k]} = 2020\nIndices: {i}, {j}, {k}\nProduct: {Convert.ToInt32(lines[i]) * Convert.ToInt32(lines[j]) * Convert.ToInt32(lines[k])}");
                            return;
                        }
                    }
                }
            }
        }
    }
}
