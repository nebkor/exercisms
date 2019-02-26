pub fn find_saddle_points(input: &[Vec<u64>]) -> Vec<(usize, usize)> {
    let mut ret = Vec::new();

    for (ridx, row) in input.iter().enumerate() {
        if let Some(rmax) = row.iter().max() {
            for (cidx, elem) in row.iter().enumerate() {
                if let Some(cmin) = input.iter().map(|r| r[cidx]).min() {
                    if *elem == cmin && elem == rmax {
                        ret.push((ridx, cidx));
                    }
                }
            }
        }
    }

    ret
}
