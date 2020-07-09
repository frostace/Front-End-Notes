Given 64 horses, 8 lanes, at lease how many matches do we have to arrange to find the 4-th fastest horse?

## Divide into 8 groups (8 times)
Last 4 in each group are eliminated
[$a_1$, $a_2$, $a_3$, $a_4$, x, x, x, x]
[$b_1$, $b_2$, $b_3$, $b_4$, x, x, x, x]
[$c_1$, $c_2$, $c_3$, $c_4$, x, x, x, x]
[$d_1$, $d_2$, $d_3$, $d_4$, x, x, x, x]
[$e_1$, $e_2$, $e_3$, $e_4$, x, x, x, x]
[$f_1$, $f_2$, $f_3$, $f_4$, x, x, x, x]
[$g_1$, $g_2$, $g_3$, $g_4$, x, x, x, x]
[$h_1$, $h_2$, $h_3$, $h_4$, x, x, x, x]

##Compare top horse in each group (1 time)

[$a_1$, $a_2$, $a_3$, $a_4$, x, x, x, x]
[$b_1$, $b_2$, $b_3$, $b_4$, x, x, x, x]
[$c_1$, $c_2$, $c_3$, $c_4$, x, x, x, x]
[$d_1$, $d_2$, $d_3$, $d_4$, x, x, x, x]

Let's the order be: $a_1$ > $b_1$ > $c_1$ > $d_1$ > $e_1$ > $f_1$ > $g_1$ > $h_1$
Last 4 horse and their corresponding groups are eliminated
[$a_1$, $b_1$, $c_1$, $d_1$, $e_1$, $f_1$, $g_1$, $h_1$] -> [$a_1$, $b_1$, $c_1$, $d_1$, x, x, x, x]

## Compare second top horse in each group (2 times)

[$a_1$, $a_2$, $a_3$, $a_4$]
[$b_1$, $b_2$, $b_3$, $b_4$]
[$c_1$, $c_2$, $c_3$, $c_4$]
[$d_1$, $d_2$, $d_3$, $d_4$]

Notice that candidates in the top-left section are still possible to be top 4 overall

[$a_1$, $a_2$, $a_3$, $a_4$]
[$b_1$, $b_2$, $b_3$, *]
[$c_1$, $c_2$, *, *]
[$d_1$, *, *, *]

So we have 9 candidates left, we need 2 more matches to find the 4-th horse.