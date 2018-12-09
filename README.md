# K-Nearest Neighbors

## Problem Domain

The average person on the street commonly looks at buildings as they walk by, and makes quick mental decisions as to the relative `size` of the building by eyesight alone.

The KNN algorithm will be using observational data with three main `features`: building width, depth, and height (in feet). The `label` of the building's size is a verbal classification acquired by the first person passing by the observer and visually inspecting the building.

The observer asks the person visually inspecting the building to choose a `label` size of the building from the following enum:

```text
Small
Large
```

## High Level Algorithm Overview

1. Record as much observation data as possible of building `features`, along with what the average person considered the building's size `label` to be.
2. Make some initial `assumptions` using a single variable (Height feature) as to what a `Large` or `Small` buildings are.
3. Perform a `map` operation using lodash to isolate a single variable to base the calculations on (the absolute value of the difference between the predicted height of a `Large` building - the actual recorded Height feature).
4. The map operation should create a new set of data with the results from step 3.
5. Sort the results from steps 3 and 4 in order, with the first results being closest to the prediction height.
6. Filter the results to include only `k` number of top records from the sort in step 5 aka `find the k nearest neighbors`
7. Count the number of occurrences of each label in the `k` result set and sort these from least to greatest
8. Retrieve the last value (now the highest count value representing the most frequent observation closest to the `assumption variable`)