fn main() {
    // Rust中所有以！结尾的调用都意味着你正在使用一个宏而不是普通函数
    println!("Hello, world!");

    // Rust中所有以！结尾的调用都意味着你正在使用一个宏而不是普通函数
    println!("{} dats", 31);

    println!("{0}, this is {1}, this is {0}", "Alice", "Bob");

    println!("{subject} {verb} {object}", object="the lazy dog", subject="the quick brown fox",verb="jumps over");

    println!("{} of {:b} people know binary, the other half doesn't", 1, 2);

    println!("{number:>width$}", number=1, width=6);

    println!("{number:0>width$}", number=1, width=6);

    println!("My name is {0}, {1} {0}", "Bond", "James");

}
