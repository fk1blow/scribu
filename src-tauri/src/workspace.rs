use serde_json::json;
use std::{
  fs::{create_dir_all, write},
  path::PathBuf,
};
use tauri::api::path::config_dir;

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
