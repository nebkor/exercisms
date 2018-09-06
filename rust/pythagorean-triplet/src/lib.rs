pub fn find_new() -> Option<u32> {
    (1..)
        .flat_map(|a| (1..=a).map(move |b| (a, b, 1000 - a - b)))
        .find(|&(a, b, c)| a * a + b * b == c * c)
        .map(|(a, b, c)| a * b * c)
}

pub fn find() -> Option<u32> {
    let mut count = 0;
    for a in 1.. {
        for b in 1..=a {
            count += 1;
            println!("loop: {}", count);
            if (a * b) % 12 == 0 {
                if let Some(c) = sum_to_1k(a, b) {
                    return Some(a * b * c);
                }
            }
        }
    }
    None
}

fn sum_to_1k(a: u32, b: u32) -> Option<u32> {
    let c = 1000 - (a + b);
    if c.pow(2) == a.pow(2) + b.pow(2) {
        return Some(c);
    }
    None
}
