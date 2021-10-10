#![cfg_attr(
  all(not(debug_assertions), target_os = "windows"),
  windows_subsystem = "windows"
)]

extern crate notify;

use tauri::WindowBuilder;
mod menu;
mod workspace;
mod commands;

fn main() {
  tauri::Builder::default()
    .menu(menu::get_menu())
    // see https://github.com/tauri-apps/tauri/issues/2521
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
        event
          .window()
          .emit("tauri://window/reload", "")
          .unwrap_or(());
      }
      "minimize_window" => {
        event.window().minimize().unwrap_or(());
      }
      "open_file" => {
        event.window().emit("tauri://file/open", "").unwrap_or(());
      }
      "new_file" => {
        event.window().emit("tauri://file/new", "").unwrap_or(());
      }
      "save_as" => {
        event
          .window()
          .emit("tauri://file/save-as", "")
          .unwrap_or(());
      }
      "redo" => {
        event.window().emit("tauri://edit/redo", "").unwrap_or(());
      }
      "show_commander" => {
        event.window().emit("tauri://commander/show", "").unwrap_or(());
      }
      "zoom_in" => {
        event.window().emit("tauri://window/zoomin", "").unwrap_or(());
      }
      "zoom_out" => {
        event.window().emit("tauri://window/zoomout", "").unwrap_or(());
      }
      _ => {}
    })
    .invoke_handler(tauri::generate_handler![commands::filepath_available])
    .setup(|app| {
      // TODO maybe defer this to the web app so that opening the window gets faster
      workspace::ensure_workspace_ready();

      // create the window
      app
        .create_window(
          "Rust".to_string(),
          tauri::WindowUrl::App("index.html".into()),
          |builder_wrapper, webview_attributes| {
            (
              builder_wrapper
                .title("scrib")
                .inner_size(1000.0, 1200.0)
                .position(600.0, 200.0),
              // .center(),
              webview_attributes,
            )
          },
        )
        .unwrap_or(());

      Ok(())
    })
    .run(tauri::generate_context!())
    .expect("error while running tauri application");
}
