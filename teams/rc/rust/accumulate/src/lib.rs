/// What should the type of _function be?
pub fn map<F, T, U>(input: Vec<T>, mut function: F) -> Vec<U>
where
    F: FnMut(T) -> U,
{
    let mut new = Vec::with_capacity(input.len());
    for e in input {
        new.push(function(e));
    }
    new
}
