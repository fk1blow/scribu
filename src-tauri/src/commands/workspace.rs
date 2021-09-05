use serde_json::json;
use std::{
  fs::{create_dir_all, write},
  io::{Error, ErrorKind},
};
use tauri::api::{file::read_string, path::config_dir};

#[derive(serde::Serialize, serde::Deserialize, Debug)]
pub struct CurrentFile {
  path: String,
}

#[derive(serde::Serialize, serde::Deserialize, Debug)]
pub struct Workspace {
  current_file: CurrentFile,
}

#[tauri::command]
pub fn prepare_workspace() -> Result<Workspace, String> {
  match read_or_create_workspace() {
    Err(_err) => Err(
      json!({
        "error": {
          "message": "cannot read workspace.json",
          "type": 1,
        }
      })
      .to_string(),
    ),
    Ok(workspace) => match serde_json::from_str::<Workspace>(&workspace) {
      Ok(m) => Ok(m),
      Err(_e) => Err(
        json!({
          "error": {
            "message": "cannot deserialize workspace.json",
            "type": 1,
          }
        })
        .to_string(),
      ),
    },
  }
}

fn read_or_create_workspace() -> Result<std::string::String, std::io::Error> {
  let user_config_dir = config_dir();

  return match user_config_dir {
    None => Err(Error::new(ErrorKind::NotFound, "oh no!")),
    Some(config_path) => {
      let path_to_scribu_folder = config_path.join("scribu");
      let path_to_workspace_json = path_to_scribu_folder.join("workspace.json");
      let workspace_json_contents = json!({
        "current_file": {
          "path": "the path",
          "filename": "scribu.md",
          "contents": ""
        }
      });

      if path_to_scribu_folder.exists() {
        read_string(&path_to_workspace_json).or_else(|_err| {
          write(
            &path_to_workspace_json.as_path(),
            workspace_json_contents.to_string(),
          )
          .map(|_op| workspace_json_contents.to_string())
        })
      } else {
        create_dir_all(&path_to_scribu_folder)
          .map(|_op| {
            write(
              &path_to_workspace_json.as_path(),
              workspace_json_contents.to_string(),
            )
          })
          .map(|_op| workspace_json_contents.to_string())
      }
    }
  };
}
