pipeline {
    agent any

    stages {
        stage {
            name: 'Clone Repository'
            steps {
                  
                  git 'https://github.com/ShriyaKriplani/node-docker-project.git'
            }
        }

        stage {
            name: 'Build Docker Image'
            steps {
                script {
                    sh 'docker-compose -f docker-compose.yml build'
                }
            }
        }
        stage {
            name: 'Run Docker Container'
            steps {
                script {
                    sh 'docker-compose -f docker-compose.yml up -d'
                }
            }
        }
    }
    
    post {
        always {
            echo 'Pipeline finished!'
        }
    }
}