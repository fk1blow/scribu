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
    // see https://github.com/tauri-apps/tauri/issues/2521
    // .setup(|app| {
    //   app.create_window("l", url, setup)
    //   Ok(())
    // }

    // can be configured through tauri.conf.json
    // .on_page_load(|window, _| {
    //   window.maximize();
    // })

    .on_menu_event(|event| match event.menu_item_id() {
      "quit" => {
        std::process::exit(0);
      }
      "close" => {
        event.window().close().unwrap();
      }
      "reload_window" => {
        event.window().emit("tauri://window/reload", "".to_string());
      }
      "minimize_window" => {
        event.window().minimize();
      }
      "open_file" => {
        event.window().emit("tauri://file/open", "".to_string());
      }
      _ => {}
    })
    .run(tauri::generate_context!())
    .expect("error while running tauri application");
}
