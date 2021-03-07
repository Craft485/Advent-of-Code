using System;
using System.IO;

namespace Advent_of_Code.Y2020 {
    class Day1 {
        static void Main(string[] args) {
            // This is going up 2 dirs because the exe is going to be in ./bin
            string[] lines = File.ReadAllLines(@"../inputs/day1.txt");
            // Match every element to every other element
            for (int i = 0; i < lines.Length; i++) {
                for (int j = 0; j < lines.Length; j++) {
                    if (Convert.ToInt32(lines[i]) + Convert.ToInt32(lines[j]) == 2020) {
                        Console.WriteLine($"{lines[i]} + {lines[j]} = 2020\nIndices: {i}, {j}\nProduct: {i * j}");
                        System.Environment.Exit(0);
                    }
                }
            }
        }
    }
}
