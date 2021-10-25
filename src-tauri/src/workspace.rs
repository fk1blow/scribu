use serde::Deserialize;
use serde_json::{json, Value};

use std::{
  fs::{create_dir_all, read_to_string, write},
  path::PathBuf,
};
use tauri::api::path::config_dir;

#[derive(Debug, Deserialize)]
pub struct WindowSize {
  pub width: f64,
  pub height: f64,
}

#[derive(Debug, Deserialize)]
pub struct WindowPosition {
  pub x: f64,
  pub y: f64,
}

#[derive(Debug, Deserialize)]
pub struct WorkspaceWindow {
  pub size: WindowSize,
  pub position: WindowPosition,
}

#[derive(Debug, Deserialize)]
#[serde(rename_all = "camelCase")]
pub struct WorkspaceCurrentFile {
  pub path: String,
}

#[derive(Debug, Deserialize)]
#[serde(rename_all = "camelCase")]
pub struct DocumentSelection {
  pub from: i32,
  pub to: i32,
}

#[derive(Debug, Deserialize)]
#[serde(rename_all = "camelCase")]
pub struct WorkspaceDocument {
  pub id: String,
  pub filepath: String,
  pub selection: DocumentSelection,
  pub scroll: i32
}

#[derive(Debug, Deserialize)]
#[serde(rename_all = "camelCase")]
pub struct Workspace {
  pub id: String,
  pub current_file: WorkspaceCurrentFile,
  pub active_document: String,
  pub opened_documents: Vec<WorkspaceDocument>,
  pub window: WorkspaceWindow,
}

pub fn ensure_workspace_ready() -> Result<Vec<Workspace>, i32> {
  ensure_app_dir_created()
    .map(|app_dir_path| {
      let workspace_path = app_dir_path.join("workspace.json");

      if !workspace_path.exists() {
        let workspace_json_contents = json!([{
          "id": "initial",
          "currentFile": ""
        }]);

        write(
          &workspace_path.as_path(),
          workspace_json_contents.to_string(),
        )
        .unwrap_or(());
      };

      ensure_temp_dir_created(app_dir_path);

      return workspace_path;
    })
    .map(|workspace_path| {
      let workspace_path_name = read_to_string(workspace_path.as_path()).unwrap();

      let workspace_list: Vec<Workspace> = serde_json::from_str(&workspace_path_name).unwrap();
      return workspace_list;
      // let yo = match serde_json::from_str::<Vec<Workspace>>(&xo) {
      //   Ok(deserialize) => {
      //     println!("deserialized = {:?}", deserialize);
      //   }
      //   Err(msg) => {
      //     // handle error here
      //   }
      // };
    })
}

fn ensure_temp_dir_created(app_dir: PathBuf) -> PathBuf {
  let temp_dir_path = app_dir.join("temp");

  if temp_dir_path.exists() {
    app_dir
  } else {
    create_dir_all(&temp_dir_path).unwrap_or(());
    app_dir
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
