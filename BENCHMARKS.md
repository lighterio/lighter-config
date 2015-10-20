# lighter-type Benchmarks

Micro benchmarks shouldn't be the sole reason to choose a library, however,
speed is a feature, so performance should not be overlooked. The following
benchmarks can be run by cloning this repository, installing dependencies,
and using the `bench` script, built on [Exam](http://lighter.io/exam).

```bash
git clone https://github.com/lighterio/lighter-type.git
cd lighter-type
npm run prebench
npm run bench -T 60000 # Roughly 60 seconds per benchmark.
```

Results vary, and this is merely the output from a single set of runs. This
set of results shows that while defining Type objects is 37% slower than
with Fiber, it is faster to instantiate a Type instance than in other
inheritance libraries. Since objects might be instantiated many times in a
service before it needs to restart, the `lighter-type` library has the
overall advantage.

```
._(O)_    ____         v1.0.1
|@A#A@|  | ___)_ ___ _ _ _ _
|@@@@@|  | _)_\ V /o` | ` ` \
|@@@@@|  |____/_A_\_,_|_|_|_|
 """""
·············++

 Definition
   ✔ fiber:    Fastest  11.744K op/s ±2.58K op/s   5.38M runs
   • util:    -3.0921%  11.381K op/s ±2.21K op/s   5.38M runs
   • klass:   -18.448%  9.5778K op/s ±2.02K op/s    133K runs
   • type:    -36.727%  7.4310K op/s ±1.67K op/s   33.4K runs
   • modelo:  -40.546%  6.9825K op/s ±1.65K op/s   27.8K runs
   • augment: -42.242%  6.7833K op/s ±1.52K op/s   25.2K runs

 Instantiation
   ✔ type:     Fastest  21.591K op/s ±6.43K op/s   7.70M runs
   • util:    -16.685%  17.989K op/s ±7.12K op/s   7.70M runs
   • modelo:  -22.161%  16.806K op/s ±7.37K op/s    401K runs
   • augment: -22.300%  16.776K op/s ±7.45K op/s    399K runs
   • fiber:   -42.781%  12.354K op/s ±3.64K op/s    129K runs
   • klass:   -84.296%  3.3907K op/s   ±374 op/s   17.8K runs

 12 passed (20.0min)
```

Pull requests are always welcome. Feel free to submit your own benchmarks.
