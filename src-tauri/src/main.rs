#![cfg_attr(
  all(not(debug_assertions), target_os = "windows"),
  windows_subsystem = "windows"
)]

extern crate reqwest;
use reqwest::header::USER_AGENT;

#[tauri::command]
fn say_hi(valor1: String) -> String {
  println!("{}", valor1);
  "Rust backend".into()
}

#[tauri::command]
async fn fetch_api(url: String) -> String {
  println!("Fetching api...");
  let client = reqwest::Client::new();


  let response_text = client
    .get(url)
    .header(USER_AGENT, "foo")
    .send()
    .await
    .unwrap()
    // .expect("Couldn't make request!")
    .text().await.expect("Could not read response text!");

  // println!("Response Text: {}", response_text);
  response_text.into()
}

fn main() {
  tauri::Builder::default()
    .invoke_handler(tauri::generate_handler![fetch_api, say_hi])
    .run(tauri::generate_context!())
    .expect("error while running tauri application");
}