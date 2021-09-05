#![cfg_attr(
  all(not(debug_assertions), target_os = "windows"),
  windows_subsystem = "windows"
)]

extern crate notify;

mod commands;
mod menu;

fn main() {
  tauri::Builder::default()
    .invoke_handler(tauri::generate_handler![
      commands::workspace::prepare_workspace
    ])
    .menu(menu::get_menu())
    .on_menu_event(|event| match event.menu_item_id() {
      "quit" => {
        std::process::exit(0);
      }
      "close" => {
        event.window().close().unwrap();
      }
      // "copy" => {
      //   println!("asdasdasdasd")
      // }
      _ => {}
    })
    .run(tauri::generate_context!())
    .expect("error while running tauri application");
}
