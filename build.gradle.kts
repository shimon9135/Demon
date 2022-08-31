import com.github.gradle.node.npm.task.NpmTask

plugins {
    id("com.github.node-gradle.node") version "3.1.1"
}

node {
    version.set("16.17.0")
    npmVersion.set("8.15.0")
    download.set(true)
}

tasks.register("npmBuild", NpmTask::class) {
    dependsOn("npmInstall")

    inputs.files("package.json", "package-lock.json", "angular.json")
    inputs.dir("src")
    inputs.dir(fileTree("node_modules").exclude(".cache"))
    outputs.dir("build")
    args.set(mutableListOf("run-script", "build"))

}

tasks.npmInstall {
    nodeModulesOutputFilter {
        exclude("package/package.json")
    }
}

node {
    download.set(true) // Do not declare the repository
    distBaseUrl.set(null as String?)
}
