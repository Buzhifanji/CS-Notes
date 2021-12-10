// 把标准库（也就是所谓的std）中的io模块引入当前的作用域中：
use std::io;
use rand::Rng;


// 猜数游戏，它会首先生成一个1到100之间的随机整数，并紧接着请求玩家对这个数字进行猜测


fn main() {
    println!("Guess the number");

    // 随机数
    let secrect_number = rand::thread_rng().gen_range(1, 101);

    println!("The secrect number is: {}", secrect_number);

    println!("Please input your guess.");

    // let foo = 5; // foo是不可变得
    // let mut bar = 5; // bar是可变的
    let mut guess = String::new();

    io::stdin().read_line(&mut guess).expect("Failed to read line");

    println!("Your guessed: {}", guess);
}
