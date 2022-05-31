#![cfg_attr(
  all(not(debug_assertions), target_os = "windows"),
  windows_subsystem = "windows"
)]

#[tauri::command]
fn say_hi(valor1: String) -> String {
  println!("{}", valor1);
  "Hello World!!".into()
}

// #[tauri::command]
// fn test() -> String {
//   let mut foo = String::new();
//   foo.push('a');
//   foo.push('r');
//   foo.push('r');

//   foo.into()
// }

fn main() {
  tauri::Builder::default()
    .invoke_handler(tauri::generate_handler![say_hi])
    .run(tauri::generate_context!())
    .expect("error while running tauri application");
}