job("Run npm test and publish") {

  failOn {
    testFailed { enabled = false }
    nonZeroExitCode { enabled = false }
  }

  startOn {
    gitPush {
      branchFilter {
        +"main"
      }
      //pathFilter {
      //  +"src/**"
      //}
    }
  }


  host("Build artifacts and a Docker image") {

    env["HUB_USER"] = Params("dockerhub_user")
    env["HUB_TOKEN"] = Secrets("dockerhub_token")
    env["SSH_PASS"] = Secrets("ssh_password")
    env["SSH_IP"] = Params("ssh_ip")
    env["SPACE_REPO"] = "ikit-ki20-161-b.registry.jetbrains.space/p/team-course-project-2022-2023/frontend-client"

    shellScript {
      // login to Docker Hub
      content = """
                    docker login ${'$'}SPACE_REPO -u ${'$'}HUB_USER --password "${'$'}HUB_TOKEN"
                """
    }

    dockerBuildPush {
      // Docker context, by default, project root
      file = "Dockerfile"
      val spaceRepo = "${"$"}SPACE_REPO/main"
      tags {
        +"$spaceRepo:1.0.${"$"}JB_SPACE_EXECUTION_NUMBER"
        +"$spaceRepo:latest"
      }
    }
  }
   container(displayName = "Run myscript", image = "ubuntu") {
        shellScript {
          content = """
                        sudo apt-get install sshpass
                        sshpass -p '${"$"}SSH_PASS' ssh -tt root@${"$"}SSH_IP
                        ls
                        ./build-client-frontend.sh
                    """
        }
    }
}

