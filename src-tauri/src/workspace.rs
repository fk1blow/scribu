use chrono::Local;
use serde_json::json;
use std::{
  ffi::OsStr,
  fmt::format,
  fs::{create_dir_all, write},
  path::{Path, PathBuf},
};
use tauri::api::path::config_dir;
use walkdir::{DirEntry, Error, WalkDir};

// ensures that the workspace is ready alongside the `app.scribu.dev` dir
pub fn ensure_workspace_ready() -> Result<PathBuf, i32> {
  ensure_app_dir_created()
    .map(|app_dir_path| {
      let workspace_path = app_dir_path.join("workspace.json");

      match workspace_path.exists() {
        true => app_dir_path,
        false => {
          let workspace_json_contents = json!({
            "currentFile": {
              "path": "the path",
            }
          });

          write(
            &workspace_path.as_path(),
            workspace_json_contents.to_string(),
          )
          .unwrap_or(());

          app_dir_path
        }
      }
    })
    .map(|p| ensure_temp_dir_created(p))
}

fn try_filename_in_path(target_path: &PathBuf) -> PathBuf {
  let dt = Local::now();
  let file_name_prefix = dt.format("%Y-%m-%d").to_string();
  let new_file_name = file_name_prefix.to_string() + ".md";
  let new_file_path = target_path.join(new_file_name);

  if new_file_path.exists() {
    println!("exists {:?}", new_file_path);

    let mut counter = 1;
    let mut retrying = false;
    let mut found_path = new_file_path;

    while retrying == false {
      let try_new_file_name = format!(
        "{} ({}).md",
        file_name_prefix.to_string(),
        counter.to_string()
      );
      let try_new_file_path = target_path.join(&try_new_file_name);

      if try_new_file_path.exists() == false {
        retrying = true;
        found_path = try_new_file_path
      } else {
        counter += 1;
      }
    }

    found_path
  } else {
    new_file_path
  }
}

// TODO move this to a commands.rs file
#[tauri::command]
pub fn create_new_file(in_path: String) -> Option<PathBuf> {
  Some(try_filename_in_path(&PathBuf::from(in_path)))
}

fn ensure_temp_dir_created(app_dir: PathBuf) -> PathBuf {
  let temp_dir_path = app_dir.join("temp");

  if temp_dir_path.exists() {
    temp_dir_path
  } else {
    create_dir_all(&temp_dir_path).unwrap_or(());
    temp_dir_path
  }
}

fn ensure_app_dir_created() -> Result<PathBuf, i32> {
  let user_config_dir = config_dir();

  match user_config_dir {
    Some(path) => {
      let app_dir_path = path.join("app.scribu.dev");

      if app_dir_path.exists() {
        Ok(app_dir_path)
      } else {
        create_dir_all(&app_dir_path)
          .and_then(|_| Ok(app_dir_path))
          .or_else(|_| Err(0))
      }
    }
    None => Err(0),
  }
}
