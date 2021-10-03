// Copyright 2019-2021 Tauri Programme within The Commons Conservancy
// SPDX-License-Identifier: Apache-2.0
// SPDX-License-Identifier: MIT

use tauri::{CustomMenuItem, Menu, MenuItem, Submenu};

pub fn get_menu() -> Menu {
  #[allow(unused_mut)]
  // let mut disable_item =
  //   CustomMenuItem::new("disable-menu".to_string(), "Disable menu").accelerator("CmdOrControl+D");
  #[allow(unused_mut)]
  // let mut test_item = CustomMenuItem::new("test".to_string(), "Test").accelerator("CmdOrControl+T");
  // #[cfg(target_os = "macos")]
  // {
  //   disable_item = disable_item.native_image(tauri::NativeImage::MenuOnState);
  //   test_item = test_item.native_image(tauri::NativeImage::Add);
  // }

  // create a submenu
  // let my_sub_menu = Menu::new().add_item(disable_item);
  let my_app_menu = Menu::new()
    .add_native_item(MenuItem::About("Scribu".to_string()))
    .add_native_item(MenuItem::Separator)
    .add_native_item(MenuItem::Quit);
  // .add_submenu(Submenu::new("Sub menu", my_sub_menu));

  let file_menu = Menu::new()
    .add_item(CustomMenuItem::new("new_file", "New File").accelerator("CmdOrControl+N"))
    .add_native_item(MenuItem::Separator)
    .add_item(CustomMenuItem::new("open_file", "Open...").accelerator("CmdOrControl+O"))
    .add_native_item(MenuItem::Separator)
    .add_item(CustomMenuItem::new("save_file", "Save").accelerator("CmdOrControl+S"))
    .add_item(CustomMenuItem::new("save_as", "Save As").accelerator("CmdOrControl+Shift+s"));

  let edit_menu = Menu::new()
    .add_native_item(MenuItem::Cut)
    .add_native_item(MenuItem::Copy)
    // .add_native_item(MenuItem::Redo)
    .add_native_item(MenuItem::Undo)
    .add_item(CustomMenuItem::new("redo", "Redo").accelerator("CmdOrControl+Shift+z"))
    .add_native_item(MenuItem::Paste);

  let window_menu = Menu::new()
    .add_item(CustomMenuItem::new("reload_window", "Reload").accelerator("CmdOrControl+R"));
  // broken on Ubuntu
  // .add_item(CustomMenuItem::new("minimize_window", "Minimize").accelerator("Cmd+M"));

  let commander_menu = Menu::new().add_item(
    CustomMenuItem::new("show_commander", "Reveal Commander").accelerator("CmdOrControl+Shift+P"),
  );

  // let test_menu = Menu::new()
  //   .add_item(CustomMenuItem::new(
  //     "selected/disabled".to_string(),
  //     "Selected and disabled",
  //   ))
  //   .add_native_item(MenuItem::Separator)
  //   .add_item(test_item);

  // add all our childs to the menu (order is how they'll appear)
  Menu::new()
    .add_submenu(Submenu::new("My app", my_app_menu))
    .add_submenu(Submenu::new("File", file_menu))
    .add_submenu(Submenu::new("Edit", edit_menu))
    .add_submenu(Submenu::new("Window", window_menu))
    .add_submenu(Submenu::new("Commander", commander_menu))
}
